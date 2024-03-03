# voiptoolbox.net

This repo is the front-end for the voiptoolbox.net website.

The site aims to be a useful resource for SIP/VoIP, with utilities and
references, primarily around how to configure and troubleshoot the protocol.

Currently the main features are:

- SIP DNS. Query common SRVs and subsequent A records from an initial query domain.
- Auth header calculator. Can be used to verify an auth'd packet is using the expected credentials.
- Packet Analysis. Intended to highlight any basic issues with the packet, e.g. malformed headers.
- Common Call Flow Diagrams
- Common SIP RFCs and codes

The site is built in React with Vite.js.