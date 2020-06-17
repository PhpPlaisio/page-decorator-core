<?php
declare(strict_types=1);

namespace Plaisio\PageDecorator;

use Plaisio\PlaisioObject;
use SetBased\Exception\LogicException;

/**
 * Factory for creating Page Decorators.
 */
class CorePageDecoratorFactory extends PlaisioObject implements PageDecoratorFactory
{
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Creates a page decorator.
   *
   * @param string $name The name of the requested page decorator.
   *
   * @return PageDecorator
   */
  public function create(string $name): PageDecorator
  {
    if ($name==='core')
    {
      return new CorePageDecorator($this);
    }

    throw new LogicException("Unknown page decorator '%s'.");
  }

  //--------------------------------------------------------------------------------------------------------------------
}

//----------------------------------------------------------------------------------------------------------------------
