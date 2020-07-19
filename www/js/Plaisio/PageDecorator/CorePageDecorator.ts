import * as $ from 'jquery';
import {Form} from '../Form/Form';
import {OverviewTablePackage as OverviewTable} from '../Table/OverviewTablePackage';

export class CorePageDecorator
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Initializes the page decorator.
   */
  public static init()
  {
    Form.registerForm('form');

    // Register all overview tables.
    let mq = window.matchMedia("only screen and (max-width: 40em)");
    OverviewTable.registerTable('table.overview-table', mq);

    // Install event handler for displaying the row count of am overview table.
    $('body').on(OverviewTable.FILTERING_ENDED, CorePageDecorator.overviewTableRowCount)

    if (window.hasOwnProperty('php_plaisio_inline_js'))
    {
      // @ts-ignore
      eval(php_plaisio_inline_js);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Updates the row count of an overview table.
   *
   * @param event The OverviewTable.FILTERING_ENDED event.
   */
  public static overviewTableRowCount(event): void
  {
    let $table = $(event.target);

    let all     = $table.children('tbody').children('tr').length;
    let visible = $table.children('tbody').children('tr:visible').length;

    if (all === visible)
    {
      $table.find('span.row_count').text(all);
    }
    else
    {
      $table.find('span.row_count').text(visible + '/' + all);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
