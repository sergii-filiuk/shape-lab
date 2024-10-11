import { FC, useRef } from 'react';
import { ToolProps } from '../types';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { RectangleIcon } from '../../../../icons/RectangleIcon';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { SHAPE_MENU_ITEMS } from './constants';
import { clsx } from 'clsx';
import { useToolBarStore } from '../../../../store/toolBarStore';
import { HamburgerMenuItem } from '../HamburgerMenu/types';

export const ShapeMenu: FC<ToolProps> = ({ id, className }) => {
  const { updateTool, setActiveToolId, getToolById } = useToolBarStore();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const state = getToolById(id);

  if (!state) return;

  const handleOnSelect = (item: HamburgerMenuItem) => {
    if (item.isSelectable)
      updateTool(id, {
        ...state,
        selected: {
          [item.id]: true,
        },
      });
    handleActiveTool();
  };

  const handleActiveTool = () => {
    if (state?.isActivable) {
      setActiveToolId(id);
    }
  };

  const selected = SHAPE_MENU_ITEMS.find((item) => state?.selected?.[item.id]);
  const SelectedItemIcon = selected?.icon || RectangleIcon;

  return (
    <div className={clsx(className, 'h-6 pl-0.5')}>
      <Menu>
        {({ close: shapeMenuClose }) => {
          return (
            <div>
              <MenuButton
                ref={menuButtonRef}
                onClick={handleActiveTool}
                className="flex"
              >
                <SelectedItemIcon className={'h-4 w-4'} />
                <ChevronDownIcon className="size-4 fill-white/60" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom start"
                className="absolute z-10 z-dropdown mt-1 w-48 cursor-pointer rounded-lg border border-gray-600 bg-gray-800 py-2 shadow-dropdown focus:outline-none"
              >
                {SHAPE_MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className={'mb-1 last:mb-0 '}
                      onClick={() => {
                        handleOnSelect(item);
                        shapeMenuClose();
                      }}
                    >
                      <button className="flex w-full rounded-t false px-2 text-xs text-white">
                        <div className="flex w-full relative mb-1 px-1 rounded last:mb-0 items-center h-6 hover:bg-gray-600">
                          <div className="flex">
                            <Icon
                              className={
                                'h-4 w-4 fill-current text-gray-400 mr-2 fill-gray-700 hover:fill-gray-600'
                              }
                            />
                            {item.label}
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </MenuItems>
            </div>
          );
        }}
      </Menu>
    </div>
  );
};
