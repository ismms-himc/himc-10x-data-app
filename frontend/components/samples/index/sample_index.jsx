import React from 'react';
import LoadingIcon from '../../loading/loading_icon';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
{/*
  there's a warning that's raised when importing this package.
  see https://github.com/adazzle/react-data-grid/issues/858
*/}
import { Toolbar, Data } from 'react-data-grid-addons';
const Selectors = Data.Selectors;
import { cloneDeep } from 'lodash';
import $ from 'jquery';
import { connect } from 'react-redux';


const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into MyCustomComponent
    rowData: rowDataSelector(state, props)
  };
});




export default class SampleIndex extends React.Component {
  constructor(props) {
    super(props);

    {/*this.state = {
      columns: [
        { key: 'sample_id', name: 'Sample ID', sortable: true, filterable: true },
        { key: 'run_id', name: 'Run ID', sortable: true, filterable: true },
        { key: 'reference_transcriptome', name: 'Reference Transcriptome', sortable: true, filterable: true },
        { key: 'viewWebSummaryButton', name: 'Web Summary' },
        { key: 'downloadFastqsButton', name: 'FASTQs'},
        { key: 'downloadGeneBcMatricesButton', name: 'Gene BC Matrices'}
      ],
      sortColumn: null,
      sortDirection: null,
      filters: {}
    };*/}

    this.viewWebSummary = this.viewWebSummary.bind(this);
    this.viewWebSummaryButton = this.viewWebSummaryButton.bind(this);
    this.addViewWebSummaryButton = this.addViewWebSummaryButton.bind(this);
    this.fetchWebSummaryUrl = this.fetchWebSummaryUrl.bind(this);

    this.addDownloadFastqsButton = this.addDownloadFastqsButton.bind(this);
    this.downloadFastqs = this.downloadFastqs.bind(this);
    this.fetchFastqsUrl = this.fetchFastqsUrl.bind(this);

    this.addDownloadGeneBcMatricesButton = this.addDownloadGeneBcMatricesButton.bind(this);
    this.downloadGeneBcMatrices = this.downloadGeneBcMatrices.bind(this);
    this.fetchGeneBcMatricesUrl = this.fetchGeneBcMatricesUrl.bind(this);

    this.fetchPresignedUrl = this.fetchPresignedUrl.bind(this);
    this.addDownloadButtons = this.addDownloadButtons.bind(this);
  }

  componentDidMount() {
    console.log('component is mounting');
    this.props.requestSamples();
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(this.props);
    console.log(nextProps);
    console.log(this.props == nextProps);
  }

  addDownloadButtons(sample) {
    {/*TODO: Do we even need to clone the sample here? */}
    const sampleClone = cloneDeep(sample);
    console.log("THIS:");
    console.log(this);
    const sampleWithWebSummaryButton = this.addViewWebSummaryButton(sampleClone);
    {/*const sampleWithWebSummaryFastqsAndMatricesButtons = this.addDownloadGeneBcMatricesButton(sampleWithWebSummaryAndFastqsButton);
    const sampleWithWebSummaryAndFastqsButton = this.addDownloadFastqsButton(sampleWithWebSummaryButton);*/}

    return sampleWithWebSummaryButton;
  }

  addDownloadFastqsButton(sample) {
    const downloadFastqsButton = <button type="submit"
                                  onClick={() => this.downloadFastqs(sample['id'])}>Download Run FASTQs</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['downloadFastqsButton'] = downloadFastqsButton;
    return sampleClone;
  }

  addDownloadGeneBcMatricesButton(sample){
    const downloadGeneBcMatricesButton = <button type="submit"
                                            onClick={() => this.downloadGeneBcMatrices(sample['id'])}>Download Matrices</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['downloadGeneBcMatricesButton'] = downloadGeneBcMatricesButton;
    return sampleClone;
  }

  addViewWebSummaryButton(sample) {
    const viewWebSummaryButton = <button type="submit"
                                  onClick={() => this.viewWebSummary(sample['id'])}>View Web Summary</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['viewWebSummaryButton'] = viewWebSummaryButton;
    return sampleClone;
  }

  downloadFastqs(sampleId) {
    {/* TODO:
      disable download button?
      put up the loading modal
      make request to backend - done
      take down loading modal
      open the presigned URL - done
      */}
    this.fetchFastqsUrl(sampleId)
  }

  downloadGeneBcMatrices(sampleId) {
    {/* TODO:
      disable download button?
      put up the loading modal
      make request to backend - done
      take down loading modal
      open the presigned URL - done
      */}
    this.fetchGeneBcMatricesUrl(sampleId);
  }

  fetchFastqsUrl(sampleId) {
    this.fetchPresignedUrl('fastqs_url', sampleId)
  }

  fetchGeneBcMatricesUrl(sampleId) {
    this.fetchPresignedUrl('gene_bc_matrices_url', sampleId)
  }

  fetchWebSummaryUrl(sampleId) {
    this.fetchPresignedUrl('web_summary_url', sampleId)
  }

  fetchPresignedUrl(resourceType, sampleId) {
    {/* Note, use of snake-case resourceType arguments below is due to the fact that
      the backend routes are named with snake-case (Python convention) instead
      of camel-case (JavaScript) convention */}
    $.ajax({
      method: 'GET',
      url: `/api/samples/${sampleId}/${resourceType}`
    })
    .fail(function (response, textStatus, errorThrown) {
      {/*
        TODO: handle failures better; also handle when fastqs not yet uploaded to
        S3 bucket. AJAX request response will be 200 OK even if resource doesn't
        exist at the URL. A new tab with and Error Code 'NoSuchKey' will open.

        In addition, handle when gene_bc_matrices not yet uploaded to S3 bucket.
        App crashes when you click 'Download Matrices' and there are none to download.
        */}
      alert('request failed')
    })
    .done(function (data, textStatus, response) {
      data = JSON.parse(data);
        window.open(data[resourceType]);
    });
  }

  viewWebSummary(sampleId) {
    {/* TODO:
      disable download button?
      put up the loading modal
      make request to backend - done
      take down loading modal
      open the presigned URL - done
      */}
    this.fetchWebSummaryUrl(sampleId)
  }

  viewWebSummaryButton({ value, griddleKey, rowData }) {
    console.log("ROW DATA");
    console.log(rowData);
    const viewWebSummaryButton = <button type="submit"
                                  onClick={() => this.viewWebSummary(rowData['id'])}>View Web Summary</button>;
    {/*const sampleClone = cloneDeep(sample);
    sampleClone['viewWebSummaryButton'] = viewWebSummaryButton;
    return sampleClone;*/}


    return (
      viewWebSummaryButton
    );
  }

  render() {
    {/*TODO: make custom noDataMessage work
      https://griddlegriddle.github.io/v0-docs/customization.html*/}

    const { samples, loading } = this.props;
    console.log(samples);
    {/*const samplesWithDownloadButtons = samples.map(this.addDownloadButtons)
    console.log("SAMPLES WITH DL BUTTONS");
    console.log(samplesWithDownloadButtons);*/}

    if (loading) {
      return <LoadingIcon />;
    } else {
      return (
        <div className='samples-index'>
          <Griddle
            data={samples}
            plugins={[plugins.LocalPlugin]}
            noDataMessage={"You have no samples at the moment."}
          >
            <RowDefinition>
              <ColumnDefinition id="sample_id" title="Sample ID" />
              <ColumnDefinition id="run_id" title="Run ID" />
              <ColumnDefinition id="reference_transcriptome" title="Reference Transcriptome" />
              <ColumnDefinition id="viewWebSummaryButton"
                                title="View Web Summary"
                                customComponent={enhancedWithRowData(this.viewWebSummaryButton)}
                                 />
            </RowDefinition>
          </Griddle>
        </div>
      );
    }
  }
}

{/*<ColumnDefinition id="downloadFastqsButton" title="FASTQs" />
<ColumnDefinition id="downloadGeneBcMatricesButton" title="Gene BC Matrices" width={400} />*/}
