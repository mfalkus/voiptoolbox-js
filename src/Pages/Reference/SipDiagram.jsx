import SIPDiagram from '../../components/sip-diagrams/SIPDiagram.jsx';
import MermaidReact from 'mermaid-react'
import ReferenceHeader from "./ReferenceHeader";

export default function SipDiagramPage() {
    return (
        <>
        <ReferenceHeader />
        <div className="header-push"></div>
        <SIPDiagram>
            <MermaidReact id="coreGraph" />
        </SIPDiagram>
        </>
    );
}
