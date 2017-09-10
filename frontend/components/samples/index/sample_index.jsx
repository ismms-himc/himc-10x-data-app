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
        { name: 'reference_transcriptome', title: 'Reference Transcriptome' },
        { name: 'viewWebSummaryButton', title: 'View web summary'}
      ],
      allowedPageSizes: [5, 10, 15],
    };

    this.viewWebSummary = this.viewWebSummary.bind(this)
    this.addViewWebSummaryButton = this.addViewWebSummaryButton.bind(this)
    this.fetchWebSummaryUrl = this.fetchWebSummaryUrl.bind(this)
  }

  componentDidMount() {
    this.props.requestSamples();
  }

  fetchWebSummaryUrl(sampleId) {
    $.ajax({
      method: 'GET',
      url: `/samples/${sampleId}/web_summary_url`
    })
    .done(function (data, textStatus, response) {
      alert(`view web summary for ${sampleId}`)
      data = JSON.parse(data);
      window.open(data['web_summary_url'])
    })
    .fail(function (response, textStatus, errorThrown) {
      {/*
        TODO: handle failures better
        */}
      alert('request failed')
    });
  }

  viewWebSummary(sampleId) {
    {/*
      disable download button?
      put up the loading modal
      make request to backend
      take down loading modal
      open the presigned URL
      */}

    this.fetchWebSummaryUrl(sampleId)
  }

  addViewWebSummaryButton(sample) {
    const viewWebSummaryButton = <button type="submit" onClick={() => this.viewWebSummary(sample['id'])}>View web summary!</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['viewWebSummaryButton'] = viewWebSummaryButton;
    return sampleClone;
  }

  render() {
    const { samples, loading } = this.props;

    const { columns, allowedPageSizes } = this.state;

    if (loading) {
      return <LoadingIcon />;
    } else if (samples.length === 0) {
      return (
                <div className='empty-index'>
                  <h2>Samples</h2>
                  <h4>There are no samples to display.</h4>
                </div>
              );
    } else {
      {/*return (
        <section className="sample-index">
          <h2>Samples</h2>
          <ul className='samples-list'>
            { samples.map((sample, idx) => {
                return <SampleIndexItem key={idx} feedItem={sample} />;
              })
            }
          </ul>
        </section>
      );*/}
      console.log('samples');
      console.log(samples);
      console.log('columns');
      console.log(columns);
      console.log('this.state');
      console.log(this.state);

      const samplesWithViewWebSummaryButton = samples.map(this.addViewWebSummaryButton)

      {/*
        should be possible to make a button that triggers a file download with
        something like
        <button type="submit" onclick="window.open('file.doc')">Download!</button>
        although the onclick function would have to be more complex
        */}
      return (
        <div className='samples-index'>
          <Grid
            rows={samplesWithViewWebSummaryButton}
            columns={columns}>
            <ColumnOrderState defaultOrder={columns.map(column => column.name)} />

            <FilteringState/>
            <SortingState
              defaultSorting={[
                { columnName: 'sample_id', direction: 'asc' },
              ]}
            />
            <GroupingState />
            <PagingState
              defaultCurrentPage={0}
              defaultPageSize={10}
            />

            <LocalFiltering />
            <LocalSorting />
            {/*<LocalGrouping />*/}
            <LocalPaging />

            <SelectionState
              defaultSelection={[1, 3, 18]}
            />

            <DragDropContext />

            <TableView
              allowColumnReordering
            />

            <TableHeaderRow allowSorting allowDragging />
            <TableFilterRow />
            <PagingPanel
              allowedPageSizes={allowedPageSizes}
            />
            <TableSelection />
            <GroupingPanel allowSorting allowDragging />
            <TableGroupRow />

          </Grid>
        </div>
      );
    }
  }
}
