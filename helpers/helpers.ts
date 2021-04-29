import React from "react";
import { IMessage } from "../types/types";
import { useMediaQuery as useRawMediaQuery } from "react-responsive";

export const getChatsFromDate = (data: any, date: Date) => {
  const messages = data.messages;
  const chatsFromDate = messages.filter((message: IMessage) => {
    const messageDate = new Date(message.date);
    if (
      messageDate.getMonth() === date.getMonth() &&
      messageDate.getDate() === date.getDate() &&
      messageDate.getFullYear() === date.getFullYear()
    ) {
      return message;
    }
  });

  return chatsFromDate;
};

/** Compares month and date and year */
export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const extractMessageText = (message: IMessage) => {
  let messageText: string;
  if (message.photo || message.file || message.thumbnail) {
    messageText = "(Non-text message)";
  } else {
    if (message.text.constructor === Array) {
      messageText = message.text[0].text;
    } else {
      messageText = message.text as string;
    }
  }

  return messageText;
};

type BreakpointType = "sm" | "md" | "lg" | "xl" | "2xl";
const screens = {
  sm: "640px",
  // => @media (min-width: 640px) { ... }

  md: "768px",
  // => @media (min-width: 768px) { ... }

  lg: "1024px",
  // => @media (min-width: 1024px) { ... }

  xl: "1280px",
  // => @media (min-width: 1280px) { ... }

  "2xl": "1536px",
  // => @media (min-width: 1536px) { ... }
};
export const useMediaQuery = ({
  minWidth,
  maxWidth,
}: {
  minWidth?: BreakpointType;
  maxWidth?: BreakpointType;
}) => {
  return useRawMediaQuery({
    minWidth: minWidth && screens[minWidth],
    maxWidth: maxWidth && screens[maxWidth],
  });
};

export const useIsSm = () => {
  return useMediaQuery({
    maxWidth: "sm",
  });
};

export const useIsMd = () => {
  return useMediaQuery({
    minWidth: "md",
  });
};

export const useIsLg = () => {
  return useMediaQuery({
    minWidth: "lg",
  });
};
