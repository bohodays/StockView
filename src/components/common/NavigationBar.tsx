import React from "react";
import { Button } from "../ui/Button";

export interface NavigationBarProps {
  showLeftButton?: boolean;
  leftButton?: React.ReactNode;
  onClickLeftButton?: () => void;
  showRightButton?: boolean;
  rightButton?: React.ReactNode;
  onClickRightButton?: () => void;
}

const NavigationBar = ({
  showLeftButton,
  leftButton,
  onClickLeftButton,
  showRightButton,
  rightButton,
  onClickRightButton,
}: NavigationBarProps) => {
  return (
    <div className="relative">
      <nav
        role="navigation"
        aria-label="Main"
        className="absolute top-0 w-full flex items-center justify-between h-12 px-2"
      >
        {showLeftButton ? (
          <Button
            onClick={() => {
              console.log("Button clicked");
              onClickLeftButton?.();
            }}
            variant={"ghost"}
            className="flex items-center justify-center"
            aria-label="Left Navigation Button"
          >
            {leftButton}
          </Button>
        ) : (
          <div /> // 빈 공간을 차지해서 균형 유지
        )}

        {showRightButton ? (
          <Button
            onClick={onClickRightButton}
            variant={"ghost"}
            className="flex items-center justify-center"
            aria-label="Right Navigation Button"
          >
            {rightButton}
          </Button>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
};

export default NavigationBar;
