import vtLogo from '../assets/vt-logo.svg'

function About() {
    return (
        <div className="text-container">
        <h1>About</h1>

        <p className="lead"><strong>voiptoolbox.net</strong> aims to be a useful resource
        for <a href="https://en.wikipedia.org/wiki/Session_Initiation_Protocol" target="_blank" rel="noreferrer">SIP</a> (VoIP). It's a mix of services,
        utilities and references, primarily around how to configure and troubleshoot
        the protocol. Whilst SIP has been around since the 90s it continues to be a
        staple for real-time communication, extensively in-use today.
        </p>

        <p>To suggest updates or improvements to the site head
        over to <a href="https://github.com/mfalkus/voiptoolbox-js">GitHub</a>.
        </p>

        <img src={vtLogo} className="about-logo" />
        </div>
    )
}

export default About;