import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import { useScenesStore } from '../../store/scenesStore';
import { SceneOptions } from './components/SceneOptions';
import { ShapeOptions } from './components/ShapeOptions';
import { RenderOptions } from './components/RenderOptions';
import { TABS } from './constants';

export const RightPanel = () => {
  const { activeSceneId, getSceneById } = useScenesStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return;

  const shapes = Object.values(scene.shapes).filter((item) => item.selected);

  return (
    <div
      id={'right-panel'}
      className="text-xs relative z-[2] h-full bg-gray-800 text-gray-50 "
    >
      <div className="flex h-full w-[248px] flex-col">
        <TabGroup>
          <div className="h-px bg-[#283137]" />
          <TabList className="fbg-gray-800 px-1">
            {TABS.map(({ name }) => (
              <Tab
                key={name}
                className="bg-gray-800 px-3 py-2 text-caption focus:outline-none"
              >
                <span className="font-bold text-white leading-[18px]">
                  {name}
                </span>
              </Tab>
            ))}
          </TabList>
          <div className="h-px bg-[#283137]" />
          <TabPanels>
            {TABS.map(({ name }) => (
              <TabPanel
                key={name}
                className="bg-gray-800 text-caption focus:outline-none"
              >
                <RenderOptions />
                {!shapes.length && <SceneOptions />}
                {!!shapes.length && <ShapeOptions />}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};
