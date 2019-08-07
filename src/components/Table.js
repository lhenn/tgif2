import React, { Component } from 'react';


const $ = require('jquery');
$.DataTable = require('datatables.net');

const columns = [
    {
        title: 'Name',
        width: 50,
        data: 'name'
    },
    {
        title: 'Party',
        width: 25,
        data: 'nickname'
    },
    {
      title: 'State',
      width:25,
      data: 'state'
    },
    {
      title: 'Years in Office',
      width:25,
      data: 'yearsInOffice'
    },
    {
      title: '% Votes With Party',
      width:25,
      data: 'percentVoteWithParty'
    },
    {
      title: '% Votes Missed',
      width:25,
      data: 'percentVotesMissed'
    }
];

class Table extends Component {
    componentDidMount() {
        $(this.refs.main).DataTable({
           dom: '<"data-table-wrapper"t>',
           data: this.props.members,
           columns,
           ordering: false
        });
    }
    componentWillUnmount(){
       $('.data-table-wrapper')
       .find('table')
       .DataTable()
       .destroy(true);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <div>
                <table ref="main" />
            </div>);
    }
}

export default Table
