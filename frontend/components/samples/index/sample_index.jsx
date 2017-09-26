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

    this.fetchPresignedUrl = this.fetchPresignedUrl.bind(this);
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
    console.log(`fetching ${resourceType}`);
    $.ajax({
      method: 'GET',
      url: `/api/samples/${sampleId}/${resourceType}`
    })
    .fail(function (response, textStatus, errorThrown) {
      console.log('ajax fail:');
      console.log(response);
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
      console.log('ajax done');
      console.log(response);
      console.log(data);
      data = JSON.parse(data);
        window.open(data[resourceType]);

    });
  }

  getRows() {
    var rows = this.props.samples || [];
    console.log('rows inside getRows');
    console.log(rows);
    if (rows.length > 0) {
      const rowsWithViewWebSummaryButton = rows.map(this.addViewWebSummaryButton);
      const rowsWithDownloadFastqsButton = rowsWithViewWebSummaryButton.map(this.addDownloadFastqsButton);
      const rowsWithDownloadGeneBcMatricesButton = rowsWithDownloadFastqsButton.map(this.addDownloadGeneBcMatricesButton);
      console.log('inside getRows');
      console.log(rowsWithDownloadGeneBcMatricesButton);
      return rowsWithDownloadGeneBcMatricesButton;
    } else {
      return rows;
    }
  }

  getSize() {
    return this.getRows().length;
  }

  rowGetter(rowIdx) {
    const rows = this.getRows();
    return rows[rowIdx];
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
    TODO: flesh out this function
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
