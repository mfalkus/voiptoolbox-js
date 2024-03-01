import { useState } from 'react';
import DnsList from './Dns.jsx';

import { useParams } from "react-router-dom";

export default function DnsForm() {

    let { queryDomain } = useParams();

    const [refreshTime, setRefreshTime] = useState(0);
    const [value, setValue] = useState(queryDomain ? queryDomain : '');
    const [submittedValue, setSubmittedValue] = useState(queryDomain ? queryDomain : '');

    const handleChange = (event) => {
        setValue( event.target.value );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let state = {};
        let unused = ''
        // value is the domain we have queried for SIP DNS
        window.history.pushState(state, unused, value);
        setRefreshTime(Date.now());
        setSubmittedValue(value);
    }

    const handleReset = (event) => {
        event.preventDefault();
        setValue('');
        setSubmittedValue('');
    }

    return (
    <>
        <form onSubmit={handleSubmit} className="row row-cols-lg-auto g-3 align-items-center">
            <div className="col-12 domain-flex-grow">
                <div className="input-group mb-2 mr-sm-2">
                    <input className="form-control" type="text" value={value} onChange={handleChange} placeholder="sip.domain.com" />
                </div>
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary mb-2 fw-bold">
                    {value && value === submittedValue ? 'Refresh' : 'Run DNS Lookup'}
                </button>
            </div>

            <div className="col-12">
                <button onClick={handleReset} className="btn btn-secondary mb-2">
                    Reset
                </button>
            </div>
        </form>

        <DnsList inputDomain={submittedValue} refreshTime={refreshTime} />
    </>
    );
}
