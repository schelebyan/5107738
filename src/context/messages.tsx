import React, { createContext, useReducer, useContext, useMemo } from "react";

import { MessageType } from "../models/Error";
import { PageError } from "../types";

enum ActionType {
  SetMessage = "SET_MESSAGE",
  ClearMessage = "CLEAR_MESSAGE",
  SetPageLoading = "SET_PAGE_LOADING",
  SetPageFetching = "SET_PAGE_FETCHING",
  SetPageError = "SET_PAGE_ERROR",
  ClearPageError = "CLEAR_PAGE_ERROR",
}

interface IState {
  message?: string;
  type: MessageType;
  pageLoading: boolean;
  pageFetching: boolean;
  pageFetchingMessage?: string;
  pageError?: PageError;
}

interface IAction {
  type: ActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

interface IDispatch {
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
  clearMessage: () => void;
  setPageLoading: (pageLoading: boolean) => void;
  setPageFetching: (pageFetching: boolean, message?: string) => void;
  setPageNotFound: () => void;
  setPageForbidden: () => void;
  clearPageError: () => void;
}

type ContextProps = IState & IDispatch;

// eslint-disable-next-line react-refresh/only-export-components
export const InitialState: IState = {
  type: MessageType.Success,
  pageLoading: false,
  pageFetching: false,
};

export const MessagesContext = createContext(InitialState as ContextProps);
// eslint-disable-next-line react-refresh/only-export-components
export const useMessages = (): ContextProps => useContext(MessagesContext);

const createSetMessageAction = (
  message?: string,
  type = MessageType.Info
): IAction => ({
  type: ActionType.SetMessage,
  payload: {
    type,
    message,
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const reducer = (state: IState, { type, payload }: IAction): IState => {
  switch (type) {
    case ActionType.SetMessage:
      if (payload.type && payload.message) {
        return {
          ...state,
          message: payload.message,
          type: payload.type,
        };
      }
      break;

    case ActionType.ClearMessage:
      return {
        ...state,
        message: undefined,
      };

    case ActionType.SetPageLoading:
    case ActionType.SetPageFetching:
      return {
        ...state,
        ...payload,
      };

    case ActionType.SetPageError:
      return {
        ...state,
        pageError: payload,
        pageLoading: false,
        pageFetching: false,
      };

    case ActionType.ClearPageError:
      return {
        ...state,
        pageError: undefined,
      };

    default:
      throw new Error(`Messages action type not found: ${type}`);
  }

  return state;
};

const MessagesProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const dispatchFunctions = useMemo(
    () => ({
      setSuccessMessage: (message: string) =>
        dispatch(createSetMessageAction(message, MessageType.Success)),
      setErrorMessage: (message: string) =>
        dispatch(createSetMessageAction(message, MessageType.Error)),
      clearMessage: () => dispatch({ type: ActionType.ClearMessage }),
      setPageLoading: (pageLoading: boolean) =>
        dispatch({ type: ActionType.SetPageLoading, payload: { pageLoading } }),
      setPageFetching: (pageFetching: boolean, pageFetchingMessage?: string) =>
        dispatch({
          type: ActionType.SetPageFetching,
          payload: { pageFetching, pageFetchingMessage },
        }),
      setPageNotFound: () =>
        dispatch({
          type: ActionType.SetPageError,
          payload: PageError.NotFound,
        }),
      setPageForbidden: () =>
        dispatch({
          type: ActionType.SetPageError,
          payload: PageError.Forbidden,
        }),
      clearPageError: () => dispatch({ type: ActionType.ClearPageError }),
    }),
    [dispatch]
  );

  return (
    <MessagesContext.Provider
      {...props}
      value={{
        ...state,
        ...dispatchFunctions,
      }}
    />
  );
};

export default MessagesProvider;
