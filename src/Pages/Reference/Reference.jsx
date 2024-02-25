import ReferenceHeader from "./ReferenceHeader";

function Reference() {

    return (
        <>
        <ReferenceHeader />
        <div className="text-container">
        <div className="header-push"></div>
        <h1>Reference Data</h1>

        <ul>
            <li><a href="#core">SIP Core RFCs</a></li>
            <li><a href="#common-extensions">Common SIP Extensions</a></li>
            <li><a href="#q850">Q850 Code Table</a></li>
            <li><a href="#compact">Compact Header Table</a></li>
        </ul>

        <hr />

        <p>If you're new to RFCs and wanting to dig into the finer details of
        SIP (or any protocol) check out the <a href="https://www.ietf.org/blog/how-read-rfc/" target="_blank" rel="noreferrer">
        "how to read an RFC"</a> blog post - well worth a look. For a more casual
        explore of the RFCs available chcekout <a
        href="https://rfc.fyi/">rfc.fyi</a> (you'll see that searching SIP
        gives plenty of results!).
        </p>
        <h2 id="core">SIP Core RFCs</h2>
        <ul>
            <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc3261" target="_blank" rel="noreferrer">
            RFC 3261 - SIP: Session Initiation Protocol
            </a>
            </li>

            <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc3262" target="_blank" rel="noreferrer">
            RFC 3262 - Reliability of Provisional Responses in the Session Initiation Protocol (SIP)
            </a>
            </li>

            <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc3263" target="_blank" rel="noreferrer">
            RFC 3263 - Session Initiation Protocol (SIP): Locating SIP Servers
            </a>
            </li>

            <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc3264" target="_blank" rel="noreferrer">
            RFC 3264 - An Offer/Answer Model with the Session Description Protocol (SDP)
            </a>
            </li>

            <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc6665" target="_blank" rel="noreferrer">
            RFC 6665 - SIP-Specific Event Notification
            </a>
            </li>
        </ul>

        <p>Not SIP specific, but used in the typical auth exchange:</p>
        <ul>
            <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc2617" target="_blank" rel="noreferrer">
            RFC 2617 - HTTP Authentication: Basic and Digest Access Authentication
            </a>
            </li>
            <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc2069" target="_blank" rel="noreferrer">
                RFC 2069 - An Extension to HTTP : Digest Access Authentication <em>(Replaced by 2617 above)</em>
            </a>
            </li>
        </ul>

        <h2 id="common-extensions">Common SIP Extensions</h2>
        <ul>
        <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc3325" target="_blank" rel="noreferrer">
        RFC 3325 - Private Extension to the Session Initiation Protocol for asserted identity within Trusted Networks
        </a>
        </li>
        <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc3711" target="_blank" rel="noreferrer">
        RFC 3711 - The Secure Real-time Transport Protocol (SRTP)
        </a>
        </li>
        <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc3891" target="_blank" rel="noreferrer">
        RFC 3891 - The Session Initiation Protocol (SIP) "Replaces" Header
        </a>
        </li>
        <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc3892" target="_blank" rel="noreferrer">
        RFC 3892 - The Session Initiation Protocol Referred-By mechanism
        </a>
        </li>
        <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc4244" target="_blank" rel="noreferrer">
        RFC 4244 - An extension to Session Initiation Protocol (SIP) for required History Information 
        </a>
        </li>
        <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc6337" target="_blank" rel="noreferrer">
        RFC 6337 - Session Initiation Protocol (SIP) Usage of the Offer/Answer Model
        </a>
        </li>
        <li>
            <a href="https://datatracker.ietf.org/doc/html/rfc8035" target="_blank" rel="noreferrer">
        RFC 8035 - Session Description Protocol (SDP) Offer/Answer Clarifications for RTP/RTCP Multiplexing
        </a>
        </li>
        </ul>

        <h2 id="q850">q850 codes</h2>


        <p className="lead">
        RFC 6432, SIP systems will sometimes send a 'q850' code (this is an ITU
        Q.850 cause code). Typically this is part of the Reason header when a
        call teardowns. See RFC 6432 for the full details.
        </p>

        <table className="table q850-list">
        <tr><th>0</th><td> Valid cause code not yet received                                                        </td></tr>
        <tr><th>1</th><td> Unallocated (unassigned) number                                                          </td></tr>
        <tr><th>2</th><td> No route to specified transit network (WAN)                                              </td></tr>
        <tr><th>3</th><td> No route to destination                                                                  </td></tr>
        <tr><th>4</th><td> Send special information tone                                                            </td></tr>
        <tr><th>5</th><td> Misdialled trunk prefix                                                                 </td></tr>
        <tr><th>6</th><td> Channel unacceptable                                                                     </td></tr>
        <tr><th>7</th><td> Call awarded and being delivered in an established channel                               </td></tr>
        <tr><th>8</th><td> Pre-emption</td></tr>
        <tr><th>9</th><td> Pre-emption – circuit reserved for reuse </td></tr>
        <tr><th>13</th><td> Call completed elsewhere</td></tr>
        <tr><th>16</th><td> Normal call clearing                                                                     </td></tr>
        <tr><th>17</th><td> User busy                                                                                </td></tr>
        <tr><th>18</th><td> No user responding                                                                       </td></tr>
        <tr><th>19</th><td> No answer from user (user alerted)</td></tr>
        <tr><th>20</th><td> Subscriber absent                                                                        </td></tr>
        <tr><th>21</th><td> Call rejected                                                                            </td></tr>
        <tr><th>22</th><td> Number changed                                                                           </td></tr>

        <tr><th>23</th><td> Redirection to new destination</td></tr>
        <tr><th>25</th><td> Exchange routing error</td></tr>
        <tr><th>26</th><td> Non-selected user clearing                                                               </td></tr>
        <tr><th>27</th><td> Destination out of order                                                                 </td></tr>
        <tr><th>28</th><td> Invalid number format (address incomplete)                                                </td></tr>

        <tr><th>29</th><td> Facility rejected                                                                        </td></tr>
        <tr><th>30</th><td> Response to STATUS ENQUIRY                                                               </td></tr>
        <tr><th>31</th><td> Normal, unspecified                                                                      </td></tr>
        <tr><th>33</th><td> Circuit out of order                                                                     </td></tr>
        <tr><th>34</th><td> No circuit/channel available                                                             </td></tr>
        <tr><th>38</th><td> Network out of order                                                               </td></tr>
        <tr><th>39</th><td> Permanent frame mode connection out of service </td></tr>
        <tr><th>39</th><td> Permanent frame mode connection operational </td></tr>
        <tr><th>41</th><td> Temporary failure                                                                        </td></tr>
        <tr><th>42</th><td> Switching equipment congestion                                                           </td></tr>

        <tr><th>43</th><td> Access information discarded                                                             </td></tr>
        <tr><th>44</th><td> Requested circuit/channel not available                                                  </td></tr>
        <tr><th>46</th><td> Precedence call blocked                                                                  </td></tr>
        <tr><th>47</th><td> Resource unavailable – unspecified                                                       </td></tr>
        <tr><th>49</th><td> Quality of service unavailable                                                           </td></tr>

        <tr><th>50</th><td> Requested facility not subscribed                                                        </td></tr>
        <tr><th>53</th><td> Outgoing calls barred within CUG                                                         </td></tr>
        <tr><th>55</th><td> Incoming calls barred within CUG                                                         </td></tr>
        <tr><th>57</th><td> Bearer capability not authorized                                                         </td></tr>
        <tr><th>58</th><td> Bearer capability not presently available                                                </td></tr>

        <tr><th>63</th><td> Service or option not available, unspecified                                             </td></tr>
        <tr><th>65</th><td> Bearer capability not implemented                                                           </td></tr>

        <tr><th>66</th><td> Channel type not implemented                                                             </td></tr>
        <tr><th>69</th><td> Requested facility not implemented                                                       </td></tr>
        <tr><th>70</th><td> Only restricted digital information bearer capability is available                       </td></tr>

        <tr><th>79</th><td> Service or option not implemented, unspecified                                           </td></tr>
        <tr><th>81</th><td> Invalid call reference value                                                             </td></tr>
        <tr><th>82</th><td> Identified channel does not exist                                                        </td></tr>

        <tr><th>83</th><td> A suspended call exists, but this call identity does not                                 </td></tr>
        <tr><th>84</th><td> Call identity in use                                                                     </td></tr>
        <tr><th>85</th><td> No call suspended                                                                        </td></tr>
        <tr><th>86</th><td> Call having the requested call identity has been cleared                                 </td></tr>

        <tr><th>87</th><td> User not member of CUG                                                            </td></tr>
        <tr><th>88</th><td> Incompatible destination                                                                 </td></tr>

        <tr><th>90</th><td> Non-existent CUG </td></tr>
        <tr><th>91</th><td> Invalid transit network selection (national use)                                         </td></tr>
        <tr><th>95</th><td> Invalid message, unspecified                                                             </td></tr>
        <tr><th>96</th><td> Mandatory information element is missing                                                 </td></tr>
        <tr><th>97</th><td> Message type non-existent or not implemented                                             </td></tr>
        <tr><th>98</th><td> Message not compatible with call state or message type non-existent or not implemented   </td></tr>
        <tr><th>99</th><td> Information element nonexistent or not implemented                                       </td></tr>
        <tr><th>100</th><td> Invalidinformation element contents                                                     </td></tr>
        <tr><th>101</th><td> Message not compatible with call state                                                   </td></tr>
        <tr><th>102</th><td> Recovery on timer expiry                                                                 </td></tr>
        <tr><th>103</th><td> parameter non-existent or not implemented – passed on                                    </td></tr>
        <tr><th>110</th><td> Message with unrecognized parameter, discarded</td></tr>
        <tr><th>111</th><td> Protocol error unspecified                                                               </td></tr>
        <tr><th>127</th><td> Internetworking, unspecified                                                             </td></tr>
        </table>

        <hr />

        <h2 id="compact">Compact Headers</h2>

        <blockquote className="blockquote">
        <p>
        SIP provides a mechanism to represent common header field names in an
        abbreviated form.  This may be useful when messages would otherwise
        become too large to be carried on the transport available to it
        (exceeding the maximum transmission unit (MTU) when using UDP, for
        example).
        </p>
        <footer className="blockquote-footer">7.3.3 Compact Form from <cite title="Source Title">RFC 3261</cite></footer>

        </blockquote>

        <table className="table table-striped">

        <tbody><tr>
        <th>Compact Value
        </th><th>Header

        </th></tr><tr>
        <td><tt>a</tt>
        </td><td>Accept-Contact

        </td></tr><tr>
        <td><tt>b</tt>
        </td><td>Referred-By

        </td></tr><tr>
        <td><tt>c</tt> 
        </td><td>Content-Type

        </td></tr><tr>
        <td><tt>e</tt>
        </td><td>Content-Encoding

        </td></tr><tr>
        <td><tt>f</tt>
        </td><td>From

        </td></tr><tr>
        <td><tt>i</tt>
        </td><td>Call-ID

        </td></tr><tr>
        <td><tt>k</tt>
        </td><td>Supported

        </td></tr><tr>
        <td><tt>l</tt>
        </td><td>Content-Length

        </td></tr><tr>
        <td><tt>m</tt>
        </td><td>Contact

        </td></tr><tr>
        <td><tt>o</tt>
        </td><td>Event

        </td></tr><tr>
        <td><tt>r</tt>
        </td><td>Refer-To

        </td></tr><tr>
        <td><tt>s</tt>
        </td><td>Subject
        </td><td>

        </td></tr><tr>
        <td><tt>t</tt>
        </td><td>To

        </td></tr><tr>
        <td><tt>u</tt>
        </td><td>Allow-Events

        </td></tr><tr>
        <td><tt>v</tt>
        </td><td>Via

        </td></tr>
        </tbody>
        </table>

        </div>
        </>
    )
}

export default Reference;