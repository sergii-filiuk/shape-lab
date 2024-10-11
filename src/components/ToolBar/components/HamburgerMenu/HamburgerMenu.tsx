import { clsx } from 'clsx';
import { Button, Menu, MenuButton, MenuItems } from '@headlessui/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
} from '@heroicons/react/16/solid';
import { HAMBURGER_MENU_ITEMS } from './constants';
import { HamburgerMenuItem } from './types';
import { generateHamburgerMenuItem } from './utils/generateHamburgerMenuItem.tsx';
import { FC, useRef } from 'react';
import { useToolBarStore } from '../../../../store/toolBarStore';
import { ToolProps } from '../types';
const className = '';
export const HamburgerMenu: FC<ToolProps> = ({ id }) => {
  const { updateTool, getToolById } = useToolBarStore();
  const hamburgerMenuButtonRef = useRef<HTMLButtonElement>(null);

  const state = getToolById(id);

  if (!state) return;

  const handleOnSelect = (item: HamburgerMenuItem) => {
    if (item.isSelectable) {
      updateTool(id, {
        ...state,
        selected: {
          ...(state.selected || {}),
          [item.id]: !state.selected?.[item.id],
        },
      });
    }
  };

  return (
    <div className={clsx(className)}>
      <Menu>
        {({ close: hamburgerMenuClose }) => {
          return (
            <>
              <MenuButton
                ref={hamburgerMenuButtonRef}
                className="h-6 pl-0.5 flex cursor-pointer items-center justify-center rounded hover:bg-gray-700  "
              >
                <CubeTransparentIcon className={'mr-1 h-[20px] w-[20px]'} />
                <ChevronDownIcon className="size-4 fill-white/60" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom start"
                className="absolute z-dropdown mt-1 w-[260px] cursor-pointer rounded-lg border border-gray-600 bg-gray-800 py-2 shadow-dropdown focus:outline-none"
              >
                {HAMBURGER_MENU_ITEMS.map((item) => {
                  if (!item.options?.length) {
                    return (
                      <Button
                        className={'mb-1 last:mb-0'}
                        disabled={item.disabled}
                        key={item.id}
                        onClick={() => {
                          !item.disabled && handleOnSelect(item);
                          hamburgerMenuClose();
                        }}
                      >
                        {generateHamburgerMenuItem(
                          item,
                          !!item.isSelectable && !!state?.selected?.[item.id]
                        )}
                      </Button>
                    );
                  } else {
                    return (
                      <Menu key={item.id}>
                        {({ open: subMenuOpen, close: subMenuClose }) => {
                          const menuButtonRef = useRef<HTMLButtonElement>(null);
                          const handleOnMouseEnter = () =>
                            !subMenuOpen && menuButtonRef?.current?.click?.();
                          const handleOnMouseLeave = () =>
                            subMenuOpen && subMenuClose();
                          return (
                            <div
                              onClick={() => {
                                hamburgerMenuClose();
                              }}
                              onMouseEnter={handleOnMouseEnter}
                              onMouseLeave={handleOnMouseLeave}
                            >
                              <MenuButton
                                ref={menuButtonRef}
                                className="flex w-full rounded-t false px-2 mb-1 text-xs text-white"
                              >
                                <div className="flex w-full relative mb-1 px-1 rounded justify-center items-center h-6 hover:bg-gray-600">
                                  <div
                                    className={
                                      'flex w-full justify-between px-2'
                                    }
                                  >
                                    <div className="flex">{item.label}</div>
                                    <ChevronRightIcon className="size-4 fill-white/60" />
                                  </div>
                                </div>
                              </MenuButton>
                              <MenuItems
                                transition
                                anchor="left"
                                className="absolute z-dropdown mt-1 w-[260px] cursor-pointer rounded-lg border border-gray-600 bg-gray-800 py-2 shadow-dropdown focus:outline-none"
                              >
                                {item.options?.map((item) => {
                                  return (
                                    <div
                                      key={item.id}
                                      className={'mb-1 last:mb-0'}
                                      onClick={() => {
                                        handleOnSelect(item);
                                        hamburgerMenuClose();
                                      }}
                                    >
                                      {generateHamburgerMenuItem(
                                        item,
                                        !!item.isSelectable &&
                                          !!state?.selected?.[item.id]
                                      )}
                                    </div>
                                  );
                                })}
                              </MenuItems>
                            </div>
                          );
                        }}
                      </Menu>
                    );
                  }
                })}
              </MenuItems>
            </>
          );
        }}
      </Menu>
    </div>
  );
};
