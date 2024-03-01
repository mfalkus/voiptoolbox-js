import { useState } from 'react';

import {getSIP} from 'sipright';

const defaultSipRequest =
`INVITE sip:bob@biloxi.com SIP/2.0
Via: SIP/2.0/UDP pc33.atlanta.com;branch=z9hG4bKnashds8
Max-Forwards: 70
To: Bob <sip:bob@biloxi.com>
From: Alice <sip:alice@atlanta.com>;tag=1928301774
Call-ID: a84b4c76e66710
CSeq: 314159 INVITE
Contact: <sip:alice@pc33.atlanta.com>
Content-Type: application/sdp\r\n\
Content-Length:   309\r\n\
\r\n\
v=0\r\n\
o=- 20500 0 IN IP4 2.3.4.5\r\n\
s= \r\n\
t=0 0\r\n\
c=IN IP4 2.3.4.5\r\n\
m=audio 50000 RTP/AVP 0\r\n\
a=rtpmap:0 PCMU/8000\r\n\
a=ptime:20\r\n\
a=sendrecv\r\n\
`;

const defaultSipResponse =
`SIP/2.0 200 OK\r\n\
Via: SIP/2.0/UDP pc33.atlanta.com;branch=z9hG4bKnashds8\r\n\
Max-Forwards: 70\r\n\
To: Bob <sip:bob@biloxi.com>\r\n\
From: Alice <sip:alice@atlanta.com>;tag=1928301774\r\n\
Call-ID: a84b4c76e66710\r\n\
CSeq: 314159 INVITE\r\n\
Contact: <sip:alice@pc33.atlanta.com>\r\n\
Content-Type: application/sdp\r\n\
Content-Length:   309\r\n\
\r\n\
v=0\r\n\
o=- 20500 0 IN IP4 2.3.4.5\r\n\
s= \r\n\
t=0 0\r\n\
c=IN IP4 2.3.4.5\r\n\
m=audio 50000 RTP/AVP 0\r\n\
a=rtpmap:0 PCMU/8000\r\n\
a=ptime:20\r\n\
a=sendrecv\r\n\
`;

export default function PacketAnalysis(props) {

    const [value, setValue] = useState(defaultSipRequest);
    const [submittedValue, setSubmittedValue] = useState('');
    const [sip, setSip] = useState();
    const [sipError, setSipError] = useState();

    const handleChange = (event) => {
        setValue( event.target.value );
        setSubmittedValue('');
    }

    const setDefaultRequest = (event) => {
        event.preventDefault();
        setValue( defaultSipRequest );
        setSubmittedValue('');
    }

    const setDefaultResponse = (event) => {
        event.preventDefault();
        setValue( defaultSipResponse );
        setSubmittedValue('');
    }

    const resetValue = (event) => {
        event.preventDefault();
        setValue( '' );
        setSubmittedValue('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setSubmittedValue(value);

        // sipright is picky about newlines
        var converted = value.replace(/(\r)?\n/g, "\r\n");
        var sipContent = null;
        var sipError = null;
        try {
            sipContent = getSIP(converted);
        } catch (err) {
            if (err && typeof(err) == 'object' ) {
                sipError = err.toString();
            } else {
                sipError = err;
            }
        }

        // Outside try/catch to reset previous errors/content
        setSip(sipContent);
        setSipError(sipError);
    }

    var sipOutput = <p>Click Analyse...</p>;
    var sipAllHeadersContent = null;
    if (sipError) {
        sipOutput = <>
            <p>{sipError}</p>
        </>
    } else if (sip) {
        let type = sip.status_code ? "Response" : "Request";
        let typeTitle = sip.method;
        if (type === "Response") {
            typeTitle = sip.status_code + ' ' + sip.reason_phrase;
        }

        let hasSdp = false;
        if (sip.headers['Content-Type'].length) {
            sip.headers['Content-Type'].forEach(function (v, i) {
                if (v && v.raw === 'application/sdp') {
                    hasSdp = true;
                }
            });
        }

        var convertedValue = submittedValue.replace(/(\r)?\n/g, "\r\n");
        var size = new TextEncoder().encode(convertedValue).length;
        var sizeWarning = null;

        if (size >= 1500) {
            sizeWarning = <><br /><small>This packet may be fragemented if transmitted via UDP. This can cause delivery issues.</small></>;
        }

        sipOutput = (
        <>
            <table className="table sip-output-table table-sm">
            <tbody>
                <tr>
                    <th>{type} Packet</th>
                    <td>{typeTitle}</td>
                </tr>
                <tr>
                    <th>Call ID</th>
                    <td><code>{sip.call_id}</code></td>
                </tr>
                <tr>
                    <th>From</th>
                    <td>
                        {sip.from.display_name ? "'" + sip.from.display_name + "'" : ""}
                        &nbsp;
                        <em>{sip.from.uri.user}@{sip.from.uri.host}</em>
                    </td>
                </tr>
                <tr>
                    <th>To</th>
                    <td>
                        {sip.to.display_name ? "'" + sip.to.display_name + "'" : ""}
                        &nbsp;
                        <em>{sip.to.uri.user}@{sip.to.uri.host}</em>
                    </td>
                </tr>
                <tr>
                    <th>Has SDP?</th>
                    <td>
                        {hasSdp ? "Yes" : "No"}
                    </td>
                </tr>

                <tr>
                    <th>Packet size</th>
                    <td>
                        {size} bytes
                        {sizeWarning}
                    </td>
                </tr>

            </tbody>
            </table>
        </>
        );

        let sipAllHeaders = [];
        let i = 0;
        for (const [key, value] of Object.entries( sip.headers )) {
            let allValues = [];
            value.forEach(function(v) {
                allValues.push(v.raw);
            });
            sipAllHeaders.push(
                <tr key={key + i}>
                    <th>{key}</th>
                    <td><code>{allValues.join(', ')}</code></td>
                </tr>
            );
            i++;
        }

        if (sipAllHeaders.length) {
            sipAllHeadersContent = (
                <>
                <table className="table sip-output-table table-sm table-striped">
                <tbody>{sipAllHeaders}</tbody>
                </table>
                </>
            );
        }
    }

    let sipOutputContent = "Waiting for packet submission...";

    if (value === submittedValue && submittedValue) {
        sipOutputContent = (<>
            <strong>
                Packet Summary &rarr;
                &nbsp;{sipError ? <span className="error-text">Error</span> : <span className="success-text">OK</span>}
            </strong>

            {sipOutput}

            {sipAllHeadersContent
                ? (
                    <>
                    <br />
                    <strong>All Headers</strong>
                    <p><em>Known compact headers will be expanded to their standard full names.</em></p>
                    {sipAllHeadersContent}
                    </>
                ) : null
            }
        </>);
    }

    return (
    <>
        <div className="row">
            <div className="col-md-6">
            <form onSubmit={handleSubmit}>
                <textarea placeholder="SIP Packet goes here..." className="sip-input-textarea" onChange={handleChange} value={value} />
                <input disabled={value === submittedValue} className="btn btn-primary" type="submit" value={value === submittedValue ? "Showing Results" : "Analyse Packet Contents"} />

                <hr />

                <input className="btn btn-light" type="button" onClick={resetValue} value="Clear" />
                &nbsp;
                <button className="btn btn-light" type="button" onClick={setDefaultRequest}>Example Request</button>
                &nbsp;
                <button className="btn btn-light" type="button" onClick={setDefaultResponse}>Example Response</button>
            </form>
            </div>
            <div className="col-md-6">
                {sipOutputContent}
            </div>
        </div>
    </>
    );
}