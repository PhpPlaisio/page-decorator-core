<?php
declare(strict_types=1);

namespace Plaisio\PageDecorator;

use Plaisio\C;
use Plaisio\Helper\Html;
use Plaisio\PlaisioInterface;
use Plaisio\PlaisioObject;
use Plaisio\Response\HtmlResponse;
use Plaisio\Response\Response;

/**
 * Decorator for creating a valid HTML document given the payload of a  page.
 */
class CorePageDecorator extends PlaisioObject implements PageDecorator
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Object constructor.
   *
   * @param PlaisioInterface $object The parent PhpPlaisio object.
   */
  public function __construct(PlaisioInterface $object)
  {
    parent::__construct($object);

    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/reset.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/style.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/grid.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/grid-large.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/grid-small.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/admin-menu-large.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/admin-menu-small.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/admin-menu-icon-large.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/admin-menu-icon-small.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/secondary-menu.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/detail-table.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/overview-table.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/overview-table-large.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/overview-table-large-content-types.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/overview-table-large-filter.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/overview-table-large-sort.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/overview-table-small.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/overview-table-small-content-types.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/overview-table-small-filter.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/input-table.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/input-table-small.css');
    $this->nub->assets->cssAppendSource('plaisio/page-decorator-core/button.css');

    $this->nub->assets->setPageTitle($this->nub->pageInfo['ptb_title'].
                                     ' - '.
                                     $this->nub->assets->getPageTitle());
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Echos the main menu.
   */
  private function echoAdminMenu(): void
  {
    echo '<div class="grid-main-menu">';

    echo '<div class="main-menu-icon">';
    echo '<div class="menu-bar1"></div>';
    echo '<div class="menu-bar2"></div>';
    echo '<div class="menu-bar3"></div>';
    echo '</div>';

    echo $this->nub->menu->menu(C::MNU_ID_ADMIN);
    echo '</div>';
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * @inheritDoc
   */
  public function decorate(string $content): Response
  {
    ob_start();

    $this->echoPageLeader();
    echo '<div class="grid-container">';
    echo '<div class="grid-main">';
    echo $content;
    echo '</div>';
    $this->echoAdminMenu();
    echo '</div>';
    $this->echoPageTrailer();

    $content = ob_get_clean();

    return new HtmlResponse($content);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Echos the XHTML document leader, i.e. the start html tag, the head element, and start body tag.
   */
  protected function echoPageLeader(): void
  {
    echo '<!DOCTYPE html>';
    echo Html::generateTag('html',
                           ['xmlns'    => 'http://www.w3.org/1999/xhtml',
                            'xml:lang' => $this->nub->babel->getLang(),
                            'lang'     => $this->nub->babel->getLang()]);
    echo '<head>';

    $this->nub->assets->echoMetaTags();
    $this->nub->assets->echoPageTitle();
    $this->nub->assets->echoCascadingStyleSheets();

    echo '</head><body>';
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Echos the XHTML document trailer, i.e. the end body and html tags, including the JavaScript code that will be
   * executed using RequireJS.
   */
  protected function echoPageTrailer(): void
  {
    $this->nub->assets->echoJavaScript();

    echo '</body></html>';
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
