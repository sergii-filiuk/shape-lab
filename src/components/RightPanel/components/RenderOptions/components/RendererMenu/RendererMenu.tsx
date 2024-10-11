import { useRef } from 'react';
import { clsx } from 'clsx';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useUiStore } from '../../../../../../store/uiStore';
import { RendererType } from '../../../../../../store/uiStore/types';
import { RENDERER_MENU_ITEMS } from './constants';

export const RendererMenu = () => {
  const { rendererType, setRendererType } = useUiStore();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleOnSelect = (rendererType: RendererType) => {
    setRendererType(rendererType);
  };

  return (
    <div className={clsx('inline-flex h-6 w-full')}>
      <Menu>
        {({ close: rendererMenuClose }) => {
          return (
            <>
              <MenuButton
                ref={menuButtonRef}
                className="flex w-full relative h-[24px] w-full cursor-pointer rounded border border-transparent bg-gray-700 px-2 text-left text-xs font-normal hover:border-gray-500"
              >
                <span
                  className={
                    'flex items-center justify-center h-full px-0.5 capitalize'
                  }
                >
                  {rendererType.replace('_', ' ')}
                </span>
                <span
                  className={
                    'pointer-events-none absolute inset-y-0 right-2 flex items-center'
                  }
                >
                  <ChevronDownIcon className="size-4 fill-white/60" />
                </span>
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom start"
                className={clsx(
                  'absolute z-dropdown mt-1 py-2 shadow-dropdown w-48 cursor-pointer rounded-lg',
                  'border border-gray-600 bg-gray-800  focus:outline-none'
                )}
              >
                {RENDERER_MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      className={'mb-1 last:mb-0'}
                      key={item.id}
                      onClick={() => {
                        handleOnSelect(item.id);
                        rendererMenuClose();
                      }}
                    >
                      <button className="flex w-full px-2 text-xs text-white">
                        <div className="flex w-full pl-2 relative px-1 rounded items-center h-6 hover:bg-gray-600">
                          <div className="flex">
                            {Icon && (
                              <Icon
                                className={
                                  'h-4 w-4 fill-current text-gray-400 mr-2 fill-gray-700 hover:fill-gray-600'
                                }
                              />
                            )}
                            {item.label}
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </MenuItems>
            </>
          );
        }}
      </Menu>
    </div>
  );
};
