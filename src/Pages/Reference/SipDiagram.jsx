import SIPDiagram from '../../components/sip-diagrams/SIPDiagram.jsx';
import MermaidReact from 'mermaid-react'

export default function SipDiagramPage() {
    return (
        <>
        <div className="header-push"></div>
        <SIPDiagram>
            <MermaidReact id="coreGraph" />
        </SIPDiagram>
        </>
    );
}
