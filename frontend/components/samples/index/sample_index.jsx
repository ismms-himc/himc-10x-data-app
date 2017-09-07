import React from 'react';
import LoadingIcon from '../loading/loading_icon';

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

export default class SampleIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'sample_id', title: 'Sample ID'},
        { name: 'reference_transcriptome', title: 'Reference Transcriptome' },
        { name: 'web_summary_url', title: 'Web Summary'}
      ],
      // TODO: will the below cause a bug? we technically have no samples until after
      // component mounts
      rows: this.props.samples, // array of sample objects
      allowedPageSizes: [5, 10, 15],
    };
  }

  componentDidMount() {
    this.props.requestSamples();
  }

  render() {
    const { samples, loading } = this.props;
    // TODO: sort samples as needed
    const { rows, columns, allowedPageSizes } = this.state;

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

      return (
        <div className='samples-index'>
          <Grid
            rows={rows}
            columns={columns}>
            <ColumnOrderState defaultOrder={columns.map(column => column.name)} />

             {/*}<FilteringState
              defaultFilters={[{ columnName: 'saleDate', value: '2016-02' }]}
            />*/}
            <SortingState
              defaultSorting={[
                { columnName: 'sample_id', direction: 'asc' },
              ]}
            />
          {/*  <GroupingState
              defaultGrouping={[{ columnName: 'product' }]}
              defaultExpandedGroups={['EnviroCare Max']}
            /> */}
            <PagingState
              defaultCurrentPage={0}
              defaultPageSize={10}
            />

            <LocalFiltering />
            <LocalSorting />
            <LocalGrouping />
            <LocalPaging />

            <SelectionState
              defaultSelection={[1, 3, 18]}
            />

            <DragDropContext />

            <TableView
              {/*tableCellTemplate={({ row, column, style }) => {
                if (column.name === 'discount') {
                  return (
                    <ProgressBarCell value={row.discount * 100} style={style} />
                  );
                } else if (column.name === 'amount') {
                  return (
                    <HighlightedCell align={column.align} value={row.amount} style={style} />
                  );
                }
                return undefined;
              }} */}
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
