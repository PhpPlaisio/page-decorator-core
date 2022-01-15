<?php
declare(strict_types=1);

namespace Plaisio\PageDecorator;

use Plaisio\C;
use Plaisio\Helper\Html;
use Plaisio\Helper\OB;
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

    $this->nub->assets->metaAddElement(['name' => 'viewport', 'content' => 'width=device-width, initial-scale=1.0']);

    $this->nub->assets->cssPushSourcesList(__CLASS__);
    $this->nub->assets->jsAdmSetMain(__CLASS__);

    $this->nub->assets->setPageTitle($this->nub->pageInfo['ptb_title']);
    $this->nub->assets->appendPageTitle($this->nub->pageInfo['pag_title']);
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * @inheritDoc
   */
  public function decorate(string $content): Response
  {
    $ob = new OB();

    $this->echoPageLeader();
    echo '<div class="grid-container">';
    echo '<div class="grid-main">';
    echo $content;
    echo '</div>';
    $this->echoAdminMenu();
    echo '</div>';
    $this->echoPageTrailer();

    return new HtmlResponse($ob->getClean());
  }

  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Echos the XHTML document leader, i.e. the start html tag, the head element, and start body tag.
   */
  protected function echoPageLeader(): void
  {
    echo '<!DOCTYPE html>';
    echo str_replace('/>', '>', Html::htmlNested(['tag'  => 'html',
                                                  'attr' => ['xmlns'    => 'http://www.w3.org/1999/xhtml',
                                                             'xml:lang' => $this->nub->babel->getLang(),
                                                             'lang'     => $this->nub->babel->getLang()]]));
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
  /**
   * Echos the main menu.
   */
  private function echoAdminMenu(): void
  {
    echo '<div class="grid-admin-menu">';

    echo '<div class="admin-menu-icon">';
    echo '<div class="menu-bar1"></div>';
    echo '<div class="menu-bar2"></div>';
    echo '<div class="menu-bar3"></div>';
    echo '</div>';

    echo '<div class="admin-menu-logo">';
    echo '<a href="/"></a>';
    echo '</div>';

    echo $this->nub->menu->menu(C::MNU_ID_ADMIN);
    echo '</div>';
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
