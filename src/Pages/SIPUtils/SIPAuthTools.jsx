import { useState } from 'react';
import {getSIP, authSIP} from 'sipright';

function SIPAuthTools() {

    let defaultSipRequest =
`INVITE sip:1001@test.pbx.com SIP/2.0
Via: SIP/2.0/TCP 10.0.0.1:10389;branch=z9hG4bK256e2860519f1d88f36f08c47932d8e2d8bdb51ffaaaa
Contact: <sip:test_user_1@10.0.0.1:10389;transport=tcp>
Allow: INVITE, ACK, OPTIONS, CANCEL, BYE, NOTIFY
Call-ID: abcdefg12346789
From: <sip:test_user_1@test.pbx.com>;tag=eaa2d2357ab272a0c6c9363e52ec3211
To: <sip:1001@test.pbx.com;user=phone>
Content-Type: application/sdp
CSeq: 1 INVITE
Max-Forwards: 69
Min-SE: 300
Session-Expires: 3600
Supported:

`;

    let sampleAuthHeader = `Digest realm="test.pbx.com",nonce="1688850200/4f6c94f962fb39b5290b075f8c5deb56",opaque="4f585d34610c2e2d",algorithm=md5,qop="auth"`;
    let msgError = null;
    let result = <p>Awaiting submission...</p>;

    let nc = null;
    let cnonce = null;

    const [value, setValue] = useState(defaultSipRequest);
    const [submittedValue, setSubmittedValue] = useState('');
    const [sip, setSip] = useState();
    const [authResult, setAuthResult] = useState();
    const [sipError, setSipError] = useState();

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

        if (sipContent && !sipError) {
            try {
                setAuthResult(authSIP(
                    sipContent,
                    'WWW-Authenticate',
                    'Digest realm="test.pbx.com",nonce="1688850200/4f6c94f962fb39b5290b075f8c5deb56",opaque="4f585d34610c2e2d",algorithm=md5,qop="auth"',
                    'testuser',
                    'testpassword'
                ));
            } catch (err) {
                if (err && typeof(err) == 'object' ) {
                    sipError = err.toString();
                } else {
                    sipError = err;
                }
            }
        }

        setSipError(sipError);
    }

    const handleChange = (event) => {
        setValue( event.target.value );
        setSubmittedValue('');
    }

    if (sipError) {
        msgError = (
            <div className="alert alert-warning" role="alert">
                <strong>Unable to process request.</strong>
                <br />{sipError}
            </div>
        );
    }

    if (authResult) {
        result = (
            <>
            <div className="mb-3">
                <label className="form-label">
                    SIP Request with <strong>{ authResult.auth_parts.new_auth_header_key }</strong> header
                </label>
                <textarea className="form-control sip-pre-text">{ authResult.new_request}</textarea>
            </div>
            <div className="mb-3">
                <label>
                    <strong>{ authResult.auth_parts.new_auth_header_key}</strong> Header Result:
                </label>
                <textarea className="form-control sip-hdr-pre-text">{ authResult.auth_parts.new_auth_header_value}</textarea>
            </div>

            <div className="mb-3">
                <label>Calculation Parts</label>
                <ul>
                    <li>Digest hash: <code>{ authResult.auth_parts.calc_parts.digest_hash.response}</code></li>
                    <li>A1 hash: <code>{ authResult.auth_parts.calc_parts.a1_md5}</code></li>
                    <li>A2 hash: <code>{ authResult.auth_parts.calc_parts.a2_md5}</code></li>
                </ul>
            </div>
            </>
        );
    }

    return (
        <>
            <h2 className="my-3">Auth Header Calculator</h2>

            <p>
            This tool allows you to calculate an authorization header for a SIP
            request. It requires a SIP request packet, challenge header
            (<code>WWW-Authenticate</code> or <code>Proxy-Authenticate</code>) plus
            credentials.</p>

            <p>The <code>nc</code> and <code>cnonce</code> values can optionally be
            supplied. This can be useful if you want to compare the output challenge
            response with the value created from another system to confirm the correct
            credentials were used.
            </p>

            {msgError}

            <div className="alert alert-info">
            <div className="tool-container">
            <div className="row">
                <div className="col">
                    <h3>Input</h3>

            <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label className="form-label">SIP Request</label>
                <textarea
                    className="form-control sip-pre-text"
                    name="packet"
                    onChange={handleChange}
                    value={value}
                />
            </div>


            <div className="mb-3">
                <label className="form-label">Challenge Auth Header Name</label>
                <select className="form-select" name="auth_header_key">
                    <option value="www-authenticate" selected>WWW-Authenticate</option>
                    <option value="proxy-authenticate">Proxy-Authenticate</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Challenge Auth Header Value</label>
                <textarea className="form-control sip-hdr-pre-text" name="challenge_header">
                {sampleAuthHeader}
                </textarea>
            </div>


            <div className="tool-container">
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input className="form-control" type="text" name="username" required />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" name="password" required />
                    </div>
                </div>
            </div>
            </div>

            <div className="tool-container">
            <div className="row">
                <h4>Optional Values</h4>
                <p>You don't have to supply either of these values, although if
                you're trying to replicate a specific Auth header generation for
                comparison you'll need to fill these in to avoid having random
                values used instead.</p>
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">NC Value</label>
                            <input className="form-control" type="text" name="nc" value={nc} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">cnonce Value</label>
                            <input className="form-control" type="text" name="cnonce" value={cnonce} />
                        </div>
                    </div>
            </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>

            </form>
            </div>

                <div className="col">
                    <h3>Output</h3>

                    {result}
                </div>
            </div>
            </div>

            </div>

            <hr />

            <h3 className="my-4">How does SIP auth work?</h3>

            <p>
            This is HTTP digest auth applied to SIP.  Digest auth verifies that both
            send/receive ends both know a shared secret, the SIP password.
            Typicaly a SIP packet is sent without an auth header, the receiving end
            will then challenge for auth (via a 401/407 response), the original
            SIP packet is then sent with a reply to this challenge.
            </p>

            <p>
            The challenge response is made up by using the MD5 hash algortihm on several
            values in a particular order, including the secret password. Here is it in
            psuedo code (the colon character ':' is literal):
            </p>

            <pre>
            HA1=MD5(username:realm:password)
            HA2=MD5(method:digestURI)
            response=MD5(HA1:nonce:nc:cnonce:auth:HA2)
            </pre>

            <p>
            In HA1, the username is the SIP authusername <em>if supplied</em>, otherwise normal
            username/identifier. Some SIP setups use a completely different username for
            auth compared to calling.
            The realm is part of what's returned by the
            40x response. If we have multiple credential sets to choose from this is one
            way to narrow down the selection for the specific endpoint.
            </p>

            <p>
            For HA2, the method is just the full name, e.g. INVITE or REGISTER.
            The digestURI is the request URI, e.g. for a full opening line of an INVITE
            packet, <code>INVITE sip:+123@test.com SIP/2.0</code> it would be <code>sip:+123@test.com</code>.
            </p>

            <p>
            The updated request packet's new auth header has some values beyond just the
            <code>response</code> hash, these include:
            </p>

            <ul>
            <li>nonce, this is a one time number supplied in the 401/407 response</li>
            <li>nc, this is our own count of requests we've sent with the supplied nonce.</li>
            <li>cnonce, a one time number/string generated by us (the SIP point creating
            the request), "...avoid chosen plaintext attacks, to provide mutual
            authentication, and to provide some message integrity protection." (RFC 2617
            3.2.2).
            </li>
            <li>
            auth, allows for extensions but for our purpose this is typically the literal string "auth".
            </li>
            </ul>

            <h4>Limits</h4>

            <p>This tool is limited to only md5 (not md5-sess or other types). Want
            more options? Get in touch!
            </p>
        </>
    );
}

export default SIPAuthTools;