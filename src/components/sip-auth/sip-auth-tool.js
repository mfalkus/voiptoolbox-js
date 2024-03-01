import md5_hex from 'md5-hex';
import {sprintf} from 'sprintf-js';

function authStringParser(str){
  var result = {};
  var data = '';
  str.split(/,| /).forEach(function(x){
    var arr = x.split('=');
    if (arr[1]) {
        // TODO: Should we unescape backslashes here?
        // TODO: Should we URI decode here?
        result[arr[0]] = arr[1].replace(/['"]+/g, '');
    } else {
        data = arr[0];
    }
  });
  return {
    data: data,
    parameter: result
  }
}

function authorize(packet, authHeaderName, response, username, password) {

    let auth_map = {
        'proxy-authenticate' : 'proxy-authorization',
        'www-authenticate' : 'authorization',
    };

    // let req = authHeaderName;
    let resp = auth_map[authHeaderName.toLowerCase()];

    let a = authStringParser(response); // a.parameter; // MF
    let h = a.parameter;

    // RFC2617
    // we support only md5 (not md5-sess or other)
    // and only empty qop or qop=auth (not auth-int or other)
    if ( a.data.toLowerCase() != 'digest'
        || h.algorithm && h.algorithm.toLowerCase() != 'md5'
        || (h.qop && !h.qop.includes('auth'))
    ) {
        throw new Error(`unsupported authorization method ${a.data} algorithm=${h.algorithm} qop=${h.qop}`);
    }

    let realm = h.realm;

    // for meaning of a1,a2... and for the full algorithm see RFC2617, 3.2.2
    let a1 = [username,realm,password].join(':'); // 3.2.2.2
    let a2 = [packet.method,packet.ruri.toString()].join(':');   // 3.2.2.3, qop == auth|undef

    let digest = {
        username : username,
        realm : realm,
        nonce : h.nonce,
        uri : packet.ruri.toString()
    };

    if (h.opaque) {
        digest.opaque = h.opaque
    }

    // 3.2.2.1
    if ( h.qop ) {
        h.qop = 'auth'; // in case it was 'auth,auth-int'
        let nc = digest.nc = '00000001';
        let cnonce = digest.cnonce = sprintf("%08x",Math.random() * (2**32));
        digest.qop = h.qop
        digest.response = md5_hex(
            [
                md5_hex(a1),
                h.nonce,
                nc,
                cnonce,
                h.qop,
                md5_hex(a2)
            ].join(':')
        );
    } else {
        // 3.2.2.1 compability with RFC2069
        digest.response = md5_hex( 
            [
                md5_hex(a1),
                h.nonce,
                md5_hex(a2),
            ].join(':')
        );
    }

    // RFC2617 has it's specific ideas what should be quoted and what not
    // so we assemble it manually
    let header = `Digest username="${digest.username}",realm="${digest.realm}",`
    + `nonce="${digest.nonce}",uri="${digest.uri}",response="${digest.response}"`;

    if (digest.opaque) {
        header += `,opaque="${digest.opaque}"`
    }

    if (digest.cnonce) {
        header += `,cnonce="${digest.cnonce}"`;
    }

    if (digest.qop) {
        header += `,qop=${digest.qop}`
    }

    if (digest.nc) {
        header += `,nc=${digest.nc}`
    }

    // Echo back the algorithm if specifically set in response
    if (h.algorithm) {
        header += `,algorithm=${h.algorithm}`
    }

    packet.setHeader( resp, header );
    debugger;

    // TODO: In the future, increase cseq, because this is a new request.

    return {
        new_request: packet.toString(),
        auth_parts: {
            new_auth_header_key: resp,
            new_auth_header_value: header,
            calc_parts: {
                a1_md5: md5_hex(a1),
                a2_md5: md5_hex(a2),
                digest_hash: digest
            }
        }
    };
}

export default authorize;