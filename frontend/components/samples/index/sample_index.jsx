import React from 'react';
import LoadingIcon from '../../loading/loading_icon';
import {
  SortingState, SelectionState, FilteringState, PagingState, GroupingState,
  LocalFiltering, LocalGrouping, LocalPaging, LocalSorting,
  ColumnOrderState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
  PagingPanel, GroupingPanel, DragDropContext,
} from '@devexpress/dx-react-grid-bootstrap3';
import { cloneDeep } from 'lodash';
import $ from 'jquery';

export default class SampleIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'sample_id', title: 'Sample ID'},
        { name: 'run_id', title: 'Run ID'},
        { name: 'reference_transcriptome', title: 'Reference Transcriptome' },
        { name: 'viewWebSummaryButton', title: 'Web Summary'},
        { name: 'downloadFastqsButton', title: 'FASTQs'},
        { name: 'downloadGeneBcMatricesButton', title: 'Gene BC Matrices'}
      ],
      allowedPageSizes: [5, 10, 15],
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
  }

  componentDidMount() {
    this.props.requestSamples();
  }

  fetchWebSummaryUrl(sampleId) {
    $.ajax({
      method: 'GET',
      url: `/api/samples/${sampleId}/web_summary_url`
    })
    .done(function (data, textStatus, response) {
      data = JSON.parse(data);
      window.open(data['web_summary_url']);
    })
    .fail(function (response, textStatus, errorThrown) {
      {/*
        TODO: handle failures better
        */}
      alert('request failed')
    });
  }

  fetchFastqsUrl(sampleId) {
    $.ajax({
      method: 'GET',
      url: `/api/samples/${sampleId}/fastqs`
    })
    .done(function (data, textStatus, response) {
      console.log('fetching fastqs');
      data = JSON.parse(data);
      window.open(data['fastqs_url']);
    })
    .fail(function (response, textStatus, errorThrown) {
      {/*
        TODO: handle failures better
        */}
      alert('request failed')
    });
  }

  fetchGeneBcMatricesUrl(sampleId) {
    $.ajax({
      method: 'GET',
      url: `/api/samples/${sampleId}/gene_bc_matrices`
    })
    .done(function (data, textStatus, response) {
      console.log('fetching gene bc matrices');
      data = JSON.parse(data);
      window.open(data['gene_bc_matrices_url']);
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

  addViewWebSummaryButton(sample) {
    const viewWebSummaryButton = <button type="submit" onClick={() => this.viewWebSummary(sample['id'])}>View Web Summary</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['viewWebSummaryButton'] = viewWebSummaryButton;
    return sampleClone;
  }

  addDownloadFastqsButton(sample) {
    const downloadFastqsButton = <button type="submit" onClick={() => this.downloadFastqs(sample['id'])}>Download Run FASTQs</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['downloadFastqsButton'] = downloadFastqsButton;
    return sampleClone;
  }

  addDownloadGeneBcMatricesButton(sample){
    const downloadGeneBcMatricesButton = <button type="submit" onClick={() => this.downloadGeneBcMatrices(sample['id'])}>Download Matrices</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['downloadGeneBcMatricesButton'] = downloadGeneBcMatricesButton;
    return sampleClone;
  }

  render() {
    const { samples, loading } = this.props;

    const { columns, allowedPageSizes } = this.state;

    if (loading) {
      return <LoadingIcon />;
    } else {

      const samplesWithViewWebSummaryButton = samples.map(this.addViewWebSummaryButton);
      const samplesWithDownloadFastqsButton = samplesWithViewWebSummaryButton.map(this.addDownloadFastqsButton);
      {/* The const below represents samples with buttons for viewing web summaries,
        downloading fastws, and downloading gene bc matrices */}
      const samplesWithDownloadGeneBcMatricesButton = samplesWithDownloadFastqsButton.map(this.addDownloadGeneBcMatricesButton);

      return (
        <div className='samples-index'>
          <h2>Samples</h2>
          <Grid
            rows={samplesWithDownloadGeneBcMatricesButton}
            columns={columns}>
            <ColumnOrderState defaultOrder={columns.map(column => column.name)} />

            <FilteringState/>
            <SortingState
              defaultSorting={[
                { columnName: 'sample_id', direction: 'asc' },
              ]}
            />
            <PagingState
              defaultCurrentPage={0}
              defaultPageSize={10}
            />

            <LocalFiltering />
            <LocalSorting />
            <LocalPaging />

            <SelectionState
              defaultSelection={[1, 3, 18]}
            />

            <DragDropContext />

            <TableView />

            <TableHeaderRow allowSorting allowDragging />
            <TableFilterRow />
            <PagingPanel
              allowedPageSizes={allowedPageSizes}
            />

          </Grid>
        </div>
      );
    }
  }
}
