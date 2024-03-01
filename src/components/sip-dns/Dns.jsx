import { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import lodash from 'lodash';

// For now we only care about SRV and A records...
const SRV_ID    = 33;
const A_ID      = 1;
const AAAA_ID   = 28;
const SOA_ID    = 6;

const generateMainQueries = (domain) => {
    return [
        [ 'SRV', `_sip._udp.${domain}`  ],
        [ 'SRV', `_sip._tcp.${domain}`  ],
        [ 'SRV', `_sip._sctp.${domain}` ],
        [ 'SRV', `_sips._tcp.${domain}` ],
        [ 'SRV', `_sip._tls.${domain}`  ],
        [ 'SRV', `_sipfederationtls._tcp.${domain}` ],
        [ 'SRV', `_ws._tcp.${domain}` ],
        [ 'SRV', `_wss._tcp.${domain}` ],
        [ 'A',      domain ],
        [ 'AAAA',   domain ],
    ];
};

const neatRecordType = (type) => {
    if (type === SRV_ID) {
        return 'SRV';
    } else if (type === SOA_ID) {
        return 'SOA';
    } else if (type === A_ID) {
        return 'A (IPv4)';
    } else if (type === AAAA_ID) {
        return 'AAAA (IPv6)';
    }
};

const recordHelp = (q) => {
    if (q && q['type'] === SRV_ID && q['name'].includes('sipfederationtls')) {
        return '"_sipfederationtls" is typically used only by Microsoft.';
    }
    return null;
}

const generateSrvExtraQueries = (domain) => {
    return [
        [ 'A',      domain ],
        [ 'AAAA',   domain ],
    ];
};

const cfLookup = (type, query) => {
    return axios({
        method: 'get',
        url: `https://cloudflare-dns.com/dns-query?type=${type}&name=${query}`,
        headers: {
            'accept':'application/dns-json'
        }
    });
};

const renderDnsTTL = (showAll, v) => {
    if (!showAll) {
        return null;
    }
    return (
        <small className="ttl-info">TTL: {v.TTL}</small>
    );
}

const renderDnsAnswerContent = (q, showAll, v) => {
    var neatAnswerType = null;
    if (q && q.type !== v.type) {
        neatAnswerType = <><code className="dns-type">{neatRecordType(v.type)}</code>&nbsp;</>
    }
    return (
        <>{neatAnswerType}<code>{v.data}</code>{renderDnsTTL(showAll, v)}</>
    );
}

const renderSrvAdditionalContent = (showAll, extraDns, hostname) => {
    if (extraDns && extraDns[hostname]) {
        let srvIps = [];
        var sortedAs = lodash.sortBy(extraDns[hostname], function(vv) {
            return vv && vv["data"];
        });
        sortedAs.forEach(function(r, i) {
            if (r && r.data && r.type) {
                srvIps.push(
                    <li key={"entry-" + i + "-" + r.data}>
                    <code className="dns-type">{neatRecordType(r.type)}</code>
                    &nbsp;
                    {renderDnsAnswerContent(null, showAll, r)}
                    </li>
                );
            }
        });
        return <ul className="srv-inner-results">{srvIps}</ul>
    }
    return null;
}

// https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6
const neatStatus = (s) => {
    if (!s) {
        return;
    }

    let out = '';
    let className = '';
    if (s && s["Status"] === 0) {
        out = 'Success';
        className='success';
    } else if (s && s["Status"] === 3) {
        out = 'Non-existent Domain';
        className='fail';
    } else {
        out = 'Status: ' + s["Status"];
    }

    return <small className={"result-status result-status--"+className}>{out}</small>;
}

const renderDnsAnswer = (showAll, s, extraDns) => {
    var title = null;
    var list = [];

    var q = s["Question"] && s["Question"][0];
    if (neatRecordType(q.type)) {
        title = (
            <>
            <code className="dns-type">{neatRecordType(q["type"])}</code>
            &nbsp;
            <strong data-tip={recordHelp(q)}>{q["name"]}</strong>
            {showAll ? neatStatus(s) : null}
            </>
        );
    } else {
        title = JSON.stringify(q);
    }

    if (s && s["Answer"]) {
        let checkSSL = false;
        if (s["Question"] && (s["Question"][0].name.includes('tls.') || s["Question"][0].name.includes('_sips.'))) {
            checkSSL = true;
        }

        // Order SRV answers by priority
        var sorted = lodash.sortBy(s["Answer"], function(v) {
            if (v["type"] === SRV_ID) {
                let srvParts = v["data"].split(' ');
                return srvParts[0];
            }
            return 65000;
        });

        sorted.forEach(function(v, k) {
            if (v["type"] === SRV_ID) {
                let srvParts = v["data"].split(' ');
                let hostname = srvParts[3];
                let srvIpRender = renderSrvAdditionalContent(showAll, extraDns, hostname);
                let checkSSLRender = checkSSL ? <span>&nbsp;<a href={`https://decoder.link/sslchecker/${srvParts[3]}/${srvParts[2]}`} rel="noreferrer" target="_blank">Check SSL</a></span> : null;

                // priority, weight, port, target
                list.push(<li key={"main-list-entry-"+k}>
                    <code>{`${srvParts[3]}:${srvParts[2]}`}</code>
                    {renderDnsTTL(showAll, v)}
                    &nbsp;
                    <span className="srv-details">{`(priority=${srvParts[0]}, weight=${srvParts[1]})`}</span>
                    {checkSSLRender}
                    {srvIpRender}
                </li>);
            } else if (v["type"] === A_ID || v["type"] === AAAA_ID) {
                list.push( <li key={"main-list-entry-"+k}>{renderDnsAnswerContent(q, showAll, v)}</li> );
            }
        });
    } else if (showAll && s && s["Authority"]) {
        var auth = s["Authority"][0];
        list.push( <li key={"main-list-entry-soa"}>{renderDnsAnswerContent(q, showAll, auth)}</li> );
    }

    return {
        title: title,
        list: list
    };

};

function DnsList(props) {

    const [apiError, setApiError] = useState(false);
    const [mainDnsData, setMainDnsResults] = useState([]);

    // Extra DNS queries... these are hostname lookups on SRV 'answers'
    const [extraDnsData, setExtraDnsResults] = useState([]);

    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        let domain = props.inputDomain;

        async function fetchData(inDomain) {

            // Big list of DNS lookup promises
            var ps = [];
            generateMainQueries(inDomain).forEach(function(d) {
                ps.push( cfLookup(d[0], d[1]) );
            });

            var extraLookups = [];
            Promise.all(ps).then(
                (values) => {
                    var out = [];
                    var uniqExtraLookup = {};
                    values.forEach(function(output) {
                        var d = output.data;
                        out.push(d);

                        // If we are an SRV, do _another_ lookup for hostname root
                        if (d && d["Answer"]) {
                            d["Answer"].forEach(function(v, k) {
                                if (v["type"] === SRV_ID) {
                                    let srvParts = v["data"].split(' ');

                                    uniqExtraLookup[srvParts[3]]= generateSrvExtraQueries(srvParts[3]);
                                }
                            });
                        }
                    });

                    // Preference SRV, AAAA, A, then _bad_ records after all that
                    out = lodash.orderBy(out, function(d) {
                        return (d.Status * 100) + (100 - (d['Question'] ? d['Question'][0].type : 0));
                    }, 'asc');

                    // Queue inner SRV hostname lookups
                    for(var key in uniqExtraLookup) {
                        var darr = uniqExtraLookup[key];
                        darr.forEach(function(d) {
                            extraLookups.push( cfLookup(d[0], d[1]) );
                        });
                    };

                    setApiError(false);
                    setMainDnsResults(out);

                    Promise.all(extraLookups).then(
                        (values) => {
                            let out = {};
                            values.forEach(function(output) {

                                let hostname = output.data["Question"][0].name;
                                if (out[hostname] === undefined) {
                                    out[hostname] = [];
                                }
                                out[hostname] = out[hostname].concat(output.data["Answer"]);
                            });
                            setExtraDnsResults(out);
                        }
                    );
                },
                (err) => {
                    setApiError(err.toString());
                }
            );
        }

        setApiError(false);
        setMainDnsResults([]);
        setExtraDnsResults([]);

        if (!domain) {
            return;
        } else {
            fetchData(domain);
        }

    }, [props.inputDomain, props.refreshTime]);

    var sections = [];
    mainDnsData && mainDnsData.forEach(function(s, i) {
        var temp = renderDnsAnswer(showAll, s, extraDnsData);

        if (temp) {
            if (temp.list.length > 0) {
                sections.push(
                    <li key={"main-" + i}>
                        <span>{temp.title}</span>
                        <ul className="answer-result-set">{temp.list}</ul>
                    </li>
                );
            } else if (showAll) {
                sections.push(
                    <li key={"main-" + i}>
                        <span>{temp.title}</span>&nbsp;<small>No records found.</small>
                    </li>
                );
            }
        }
    });

    if (!props.inputDomain) {
        return null;
    } else if (apiError) {
        return (
            <>
            <h2>Error with DNS API</h2>
            <p>{apiError}</p>
            </>
        );
    } else if (sections.length === 0 && (!mainDnsData || mainDnsData.length === 0)) {
        return <h2>Loading...</h2>;
    } else if (sections.length === 0) {
        return <h2>Nothing found for: <code>{props.inputDomain}</code></h2>;
    }

    return (
        <div className="dns-results">
            <ReactTooltip />
            <hr />
            <p className="lead">
                <strong>{props.inputDomain}</strong> <small>DNS Results:</small>
                <button className="btn btn-sm btn-extra-info" onClick={() => setShowAll(!showAll)}>{showAll ? "Show Summary" : "Show Detail"}</button>
            </p>
            <ul className="main-result-set">{sections}</ul>
        </div>
    );
}

export default DnsList;
