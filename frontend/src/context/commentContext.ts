import { createContext } from "react";

type CommentContextType = {
	deleteComment: (commentId: number) => void;
}

export const CommentContext = createContext<CommentContextType | null>(null);
