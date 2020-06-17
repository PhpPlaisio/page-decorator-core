/*jslint browser: true, vars: true, indent: 2, maxlen: 120 */
/*global define */

//----------------------------------------------------------------------------------------------------------------------
define(
  'Plaisio/PageDecorator/OverviewTable',

  ['jquery', 'SetBased/Abc/Table/OverviewTablePackage'],

  function ($, BaseOverviewTable) {
    "use strict";
    //------------------------------------------------------------------------------------------------------------------
    /**
     * Object constructor.
     *
     * @param table
     * @constructor
     */
    function OverviewTable(table) {
      // Use parent constructor.
      BaseOverviewTable.call(this, table);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Extend OverviewTable from BaseOverviewTable.
    OverviewTable.prototype = Object.create(BaseOverviewTable.prototype);
    // Set constructor for OverviewTable.
    OverviewTable.constructor = OverviewTable;

    //------------------------------------------------------------------------------------------------------------------
    OverviewTable.prototype.filterHook = function () {
      let all;
      let visible;

      all = this.$table.children('tbody').children('tr').length;
      visible = this.$table.children('tbody').children('tr:visible').length;

      if (all === visible) {
        this.$table.find('span.row_count').text(all);
      } else {
        this.$table.find('span.row_count').text(visible + '/' + all);
      }
    };

    //------------------------------------------------------------------------------------------------------------------
    /**
     * Registers tables that matches a jQuery selector as a BaseOverviewTable (and OverviewTable).
     *
     * @param selector The jQuery selector.
     */
    OverviewTable.registerTable = function (selector) {
      // Register all overview tables as a BaseOverviewTable (and OverviewTable).
      BaseOverviewTable.registerTable(selector, 'OverviewTable');
    };

    //------------------------------------------------------------------------------------------------------------------
    return BaseOverviewTable;
  }
);

//----------------------------------------------------------------------------------------------------------------------
