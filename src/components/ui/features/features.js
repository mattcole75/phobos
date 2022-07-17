import React from 'react';

const features = () => (

    <section className="container px-4 py-5" id="icon-grid">
        <h2 className="pb-2 border-bottom">Features</h2>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
            <div className="col d-flex align-items-start">
                <i className='bi-lightbulb fs-1 d-block text-sm-center text-muted flex-shrink-0 me-3' />
                <div>
                    <h4 className="fw-bold mb-0">Understanding risk</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div className="col d-flex align-items-start">
                <i className='bi-graph-down-arrow fs-1 d-block text-sm-center text-muted flex-shrink-0 me-3' />
                <div>
                    <h4 className="fw-bold mb-0">Risk profile</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div className="col d-flex align-items-start">
                <i className='bi-percent fs-1 d-block text-sm-center text-muted flex-shrink-0 me-3' />
                <div>
                    <h4 className="fw-bold mb-0">Risk coverage</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div className="col d-flex align-items-start">
                <i className='bi-sun fs-1 d-block text-sm-center text-muted flex-shrink-0 me-3' />
                <div>
                    <h4 className="fw-bold mb-0">Opportunities</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div className="col d-flex align-items-start">
                <i className='bi-ui-checks-grid fs-1 d-block text-sm-center text-muted flex-shrink-0 me-3' />
                <div>
                    <h4 className="fw-bold mb-0">Incident management</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div className="col d-flex align-items-start">
                <i className='bi-balloon-heart fs-1 d-block text-sm-center text-muted flex-shrink-0 me-3' />
                <div>
                    <h4 className="fw-bold mb-0">Risk engagement</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div className="col d-flex align-items-start">
                <i className='bi-file-earmark-person fs-1 d-block text-sm-center text-muted flex-shrink-0 me-3' />
                <div>
                    <h4 className="fw-bold mb-0">Individual profiles</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
            <div className="col d-flex align-items-start">
                <i className='bi-bar-chart-line fs-1 d-block text-sm-center text-muted flex-shrink-0 me-3' />
                <div>
                    <h4 className="fw-bold mb-0">Reporting</h4>
                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                </div>
            </div>
        </div>
    </section>
);

export default features;