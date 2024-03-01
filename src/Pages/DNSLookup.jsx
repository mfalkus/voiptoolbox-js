import DnsForm from '../components/sip-dns/DnsForm.jsx';
import DnsAbout from '../components/sip-dns/DnsAbout.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
// import '../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css';

export default function DnsLookup() {
    return (
        <>
        <div className="cover-container">
            <main className="px-3">
                <p className="lead">
                    SRV, A and AAAA Lookup
                    &nbsp;
                    <a href="#dns-help">
                        <FontAwesomeIcon icon={faQuestionCircle} />
                    </a>
                </p>
                <DnsForm />
            </main>
        </div>
        <div id="dns-help" className="cover-container d-flex w-100 mh-100 p-3 mx-auto flex-column">
            <DnsAbout />
        </div>
        </>
    );
}
