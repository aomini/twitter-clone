import React from "react";
import styled from "styled-components";
import Dropdown from "./../Dropdown/Dropdown";
import DropdownMenu from "../Dropdown/DropdownMenu";
import Button from "../Button/Button";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { ICell } from "./../../Interfaces/Cell.interface";
import {dikjistra, BFS, DFS} from "./../../Algorithms/Algorithms"

const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props): string => props.theme.section};
  transition: background 500ms ease;
  padding: 8px;

  > h2 {
    margin: 0;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-grow: 0.1;
`;

interface IProps {
  onHandleClick: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
}

interface IList {
  active?: boolean;
  label: string;
  algorithm: (nodes: ICell[]) => ICell[] | void;
}

interface IAlgorithmContext {
  setAlgorithm?: () => void;
  algorithmIndex: number;
}

const IActionHeaderContext = React.createContext<IAlgorithmContext>({
  algorithmIndex: 0,
});

const getAlgorithms = (): IList[] => {
  const lists: IList[] = [
    { label: "Dijkistra", active: true, algorithm: dikjistra},
    { label: "A* Algorithm", algorithm: dikjistra},
    { label: "Breadth First Algorithm", algorithm: BFS },
    { label: "Depth First Algorithm", algorithm: DFS },
  ];
  return lists;
};

const getActiveAlgorithm = <T extends IList>(lists: T[]): T | null => {
  const activeList = lists.filter((x: T) => x.active);
  return activeList ? activeList[0] : null;
};

const ActionHeader: React.FC<IProps> = ({ onHandleClick }) => {
  const [algorithms, setAlgorithm] = React.useState<Array<IList>>(
    getAlgorithms()
  );
  const [activeAlgorithm, setActiveAlgorithm] = React.useState<IList | null>();

  React.useEffect(() => {
    setActiveAlgorithm(getActiveAlgorithm(algorithms));
  }, [algorithms]);

  const handleAlgorithmSelection = (index: number): void => {
    const updatedAlgo = algorithms.map((x: IList, i: number) => {
      index === i ? (x.active = true) : (x.active = false);
      return x;
    });
    setAlgorithm(updatedAlgo);
  };

  return (
    <HeaderNav>
      <h2>Rakesh</h2>
      <Actions>
        <Dropdown>
          <Dropdown.Button menuLabel="visualize">
            {activeAlgorithm ? activeAlgorithm.label : "Algorithms"}
          </Dropdown.Button>
          <Dropdown.Menu menuLabel="visualize">
            {algorithms.map((x: IList, index: number) => (
              <DropdownMenu.Item
                key={x.label}
                index={index}
                onHandleMouseDown={handleAlgorithmSelection}
              >
                {x.label}
              </DropdownMenu.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button primary onHandleClick={onHandleClick}>
          Visualize
        </Button>
        <ThemeToggle />
      </Actions>
    </HeaderNav>
  );
};

export default ActionHeader;
