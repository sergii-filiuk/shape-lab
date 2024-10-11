import { RendererMenu } from './components/RendererMenu';

export const RenderOptions = () => {
  return (
    <div className={'flex flex-col pb-3 pl-4 pr-3 pt-4'}>
      <div className={'mb-3 flex items-center text-xs font-bold text-gray-300'}>
        <span>Renderer:</span>
      </div>
      <div>
        <RendererMenu />
      </div>
    </div>
  );
};
