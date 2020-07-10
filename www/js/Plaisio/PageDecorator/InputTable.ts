import * as Cookies from 'js-cookie';

/**
 * Class for input tables.
 */
export class InputTable
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * The input table.
   */
  private $table: JQuery;

  /**
   * All registered input tables.
   */
  protected static tables: InputTable[] = [];

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Object constructor.
   *
   * @param $table The input table.
   */
  public constructor($table: JQuery)
  {
    // The HTML table associated with the JavaScript object.
    this.$table = $table;

    //  Resize table cell width buttons.
    this.resizeButton();
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Resize table cell width buttons.
   */
  private resizeButton(): void
  {
    let $buttonsCells = this.$table.find('table.button').find('td');
    let countOfButtons = $buttonsCells.length;

    let diff = 100 % countOfButtons;
    let width = Math.round((100 - diff) / countOfButtons);

    if (diff)
    {
      $buttonsCells.each(function ()
      {
        let $this = $(this);

        diff = diff - 1;
        if (diff > 0)
        {
          $this.css('width', (width + 1) + '%');
        }
        else
        {
          $this.css('width', width + '%');
        }
      });
    }
    else
    {
      $buttonsCells.css('width', width + '%');
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Registers tables that matches a jQuery selector as an InputTable.
   *
   * @param selector The jQuery selector.
   */
  public static registerTable(selector: string)
  {
    let that = this;

    $(selector).each(function ()
    {
      let $table = $(this);

      if (!$table.is('table'))
      {
        // Selector is not a table. Find the table below the selector.
        $table = $table.find('table').first();
      }

      if (!$table.hasClass('is-registered'))
      {
        InputTable.tables.push(new that($table));
        $table.addClass('is-registered');
      }
    });
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Sets the CSRF cookie.
   */
  public static setCsrfValue(): void
  {
    $('input[type=hidden][name=ses_csrf_token]').val(Cookies.get('ses_csrf_token'));
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
