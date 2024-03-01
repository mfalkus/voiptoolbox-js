function DnsAbout() {
    return (
        <>
        <hr />
        <h3>About SIP DNS</h3>
        <div className="text-start">
        <p className="lead">
        This SIP DNS lookup tool provides a quick method to lookup DNS records used in <a href="https://en.wikipedia.org/wiki/Session_Initiation_Protocol" target="_blank"  rel="noreferrer">SIP</a> (VoIP) from a single root
            domain.</p>

            <p>SIP typically uses SRV and A DNS records (or AAAA for those IPv6
                users). If you're not familiar with SRV, check out the <a
         rel="noreferrer" target="_blank" href="https://en.wikipedia.org/wiki/SRV_record">SRV wikipedia page</a> which is well put together.
        SRV is a record type designed to provide
        multiple servers (hostname <em>and</em> port) along with a priority and weight for a given service.
             Priority is the one to focus on first. The lower the number the more preferred the entry is.
        Weight is used to then decide how to route traffic between servers with the <em>same</em> priority. If two records with the same priority had a weight of 60 and 40, then the first would be tried 60% of the time, the second 40% of the time. Nice and straight forward.
        </p>

        <p>This site works by querying the 'typical' SRV hostnames, e.g.
        <code>foobar.com</code> for SIP may have records at <code>_sip._udp.foobar.com</code> for SIP UDP servers, <code>_sip._tcp.foobar.com</code> for SIP TCP servers and maybe <code>_sips._tcp.foobar.com</code> for TLS as well.
        These SRV records then have hostname entries that need resolving again, as per normal A/AAAA records.
        </p>

        </div>

        <h3>How do I run the queries myself?</h3>

        <div className="text-start">
        <p>For those on Windows based machines, check
        out <code>nslookup</code>, <a target="_blank" rel="noreferrer"
        href="https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/verify-srv-dns-records-have-been-created#method-3-use-nslookup">more
        information here</a>. For everyone else <code>dig</code> is likely the
        go-to tool, <a
        target="_blank" rel="noreferrer" href="https://www.digitalocean.com/community/tutorials/how-to-use-dig-whois-ping-on-an-ubuntu-vps-to-query-dns-data">Digital
        Ocean have a guide that's a good starting point</a>.</p>

        </div>
        <hr />
        <h3>Credits</h3>

        <p>DNS Powered by <a target="_blank" rel="noreferrer" href="https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/">Cloudflare's HTTP DNS API</a>.</p>

        </>
    );
}

export default DnsAbout;
