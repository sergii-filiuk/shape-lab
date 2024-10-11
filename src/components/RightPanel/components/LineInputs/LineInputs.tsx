import { LineInput, LineInputsProps, LineInputType } from './types';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { lineInputsToMap } from './utils/lineInputsToMap.ts';
import styles from './LineInputs.module.scss';

import { Input } from '@headlessui/react';
import { clsx } from 'clsx';
import { isValidLineInputValue } from './utils/isValidLineInputValue';
import { formatValue } from './utils/formatValue.ts';

export const LineInputs: FC<LineInputsProps> = ({
  inputsPerLine = 1,
  inputs,
  onChange,
}) => {
  const [values, setValues] = useState<Record<string, string | number>>(
    lineInputsToMap(inputs)
  );
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: LineInput
  ) => {
    let value: string | number = e.target.value;
    switch (item.type) {
      case LineInputType.NUMBER: {
        value = isValidLineInputValue(item.type, value)
          ? parseFloat(value)
          : value;
      }
    }
    setValues({ ...values, [item.id]: value });
    if (isValidLineInputValue(item.type || LineInputType.STRING, value)) {
      onChange?.(item.id, value);
    }
  };

  const handleOnBlur = () => {
    setValues(lineInputsToMap(inputs));
  };

  useEffect(
    () => {
      setValues(lineInputsToMap(inputs));
    },
    inputs.flatMap((item) => item.value)
  );

  return (
    <div className={'relative flex items-center'}>
      <div
        style={{
          gridTemplateColumns: `repeat(${inputsPerLine},1fr)`,
        }}
        className={clsx('flex w-full flex-wrap', `grid gap-[8px_2px]`)}
      >
        {inputs.map((item, idx) => {
          const isRightSide = (idx + 1) % inputsPerLine === 0;
          const isLeftSide =
            idx >= 0 && (idx - inputsPerLine) % inputsPerLine === 0;
          const isBetween = !(isRightSide || isLeftSide);
          const isOneInLine = isLeftSide && idx === inputs.length - 1;

          const borderContainerStyle = clsx(
            isRightSide && styles.rightBorderContainer,
            isLeftSide && styles.leftBorderContainer,
            isBetween && styles.betweenBorderContainer,
            isOneInLine && styles.onInLineBorderContainer
          );

          return (
            <div
              key={item.id}
              className={clsx(
                borderContainerStyle,
                styles.focus,
                styles.bg,
                'flex text-xs items-center h-[22px]'
              )}
            >
              {item.icon && (
                <span className={clsx(styles.icon, 'h-4 w-4 text-gray-500')}>
                  {item.icon}
                </span>
              )}
              <Input
                onBlur={handleOnBlur}
                autoComplete="off"
                name={item.name}
                className={clsx(borderContainerStyle, styles.input)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, item)
                }
                value={formatValue(values[item.id], item.type as LineInputType)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
