import React from 'react';
import LoadingIcon from '../../loading/loading_icon';
import ReactDataGrid from 'react-data-grid';
{/*
  there's a warning that's raised when importing this package.
  see https://github.com/adazzle/react-data-grid/issues/858
*/}
import { Toolbar, Data } from 'react-data-grid-addons';

const Selectors = Data.Selectors;

import { cloneDeep } from 'lodash';
import $ from 'jquery';

export default class SampleIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { key: 'sample_id', name: 'Sample ID', sortable: true, filterable: true },
        { key: 'run_id', name: 'Run ID', sortable: true, filterable: true },
        { key: 'reference_transcriptome', name: 'Reference Transcriptome', sortable: true, filterable: true },
        { key: 'viewWebSummaryButton', name: 'Web Summary' },
        { key: 'downloadFastqsButton', name: 'FASTQs'},
        { key: 'downloadGeneBcMatricesButton', name: 'Gene BC Matrices'}
      ]
    };

    this.viewWebSummary = this.viewWebSummary.bind(this);
    this.addViewWebSummaryButton = this.addViewWebSummaryButton.bind(this);
    this.fetchWebSummaryUrl = this.fetchWebSummaryUrl.bind(this);

    this.addDownloadFastqsButton = this.addDownloadFastqsButton.bind(this);
    this.downloadFastqs = this.downloadFastqs.bind(this);
    this.fetchFastqsUrl = this.fetchFastqsUrl.bind(this);

    this.addDownloadGeneBcMatricesButton = this.addDownloadGeneBcMatricesButton.bind(this);
    this.downloadGeneBcMatrices = this.downloadGeneBcMatrices.bind(this);
    this.fetchGeneBcMatricesUrl = this.fetchGeneBcMatricesUrl.bind(this);

    this.rowGetter = this.rowGetter.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getSize = this.getSize.bind(this);
  }

  componentDidMount() {
    this.props.requestSamples();
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

  getRows() {
    var rows = this.props.samples || [];
    return rows
  }

  getSize() {
    return this.getRows().length;
  }

  rowGetter(rowIdx) {
    const rows = this.getRows();
    return rows[rowIdx];
  }

  fetchFastqsUrl(sampleId) {
    fetchPresignedUrl('fastqs_url', sampleId)
  }

  fetchGeneBcMatricesUrl(sampleId) {
    fetchPresignedUrl('gene_bc_matrices_url', sampleId)
  }

  fetchWebSummaryUrl(sampleId) {
    fetchPresignedUrl('web_summary_url', sampleId)
  }

  fetchPresignedUrl(resourceType, sampleId) {
    console.log(`fetching ${resourceType}`);

    $.ajax({
      method: 'GET',
      url: `/api/samples/${sampleId}/${resourceType}`
    })
    .done(function (data, textStatus, response) {
      data = JSON.parse(data);
      window.open(data[resource_type]);
    })
    .fail(function (response, textStatus, errorThrown) {
      {/*
        TODO: handle failures better
        */}
      alert('request failed')
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

  handleGridSort(sortColumn, sortDirection) {
  {/*
    TODO: flex out this function
    */}
    console.log('sortColumn:');
    console.log(sortColumn);
    console.log('sortDirection:');
    console.log(sortDirection);
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
  }

  render() {
    const { samples, loading } = this.props;
    const { columns, allowedPageSizes } = this.state;

    if (loading) {
      return <LoadingIcon />;
    } else {

      {/*
        const samplesWithViewWebSummaryButton = samples.map(this.addViewWebSummaryButton);
        const samplesWithDownloadFastqsButton = samplesWithViewWebSummaryButton.map(this.addDownloadFastqsButton);
        The const below represents samples with buttons for viewing web summaries,
        downloading fastws, and downloading gene bc matrices
        const samplesWithDownloadGeneBcMatricesButton = samplesWithDownloadFastqsButton.map(this.addDownloadGeneBcMatricesButton);
         */}

      return (
        <div className='samples-index'>
          <ReactDataGrid
            onGridSort={this.handleGridSort}
            enableCellSelect={true}
            columns={columns}
            rowGetter={this.rowGetter}
            rowsCount={this.getSize()}
            minHeight={500}
            toolbar={<Toolbar enableFilter={true}/>}
            onAddFilter={this.handleFilterChange}
            onClearFilters={this.onClearFilters} />
        </div>
      );
    }
  }
}
