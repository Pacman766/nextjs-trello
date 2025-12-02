import { createClient } from "@/lib/supabase/client";
import { Board, Column } from "./supabase/models";

const supabase = createClient();

export const boardService = {
	async getBoards(userId: string): Promise<Board[]> {
		const { data, error } = await supabase
			.from("boards")
			.select("*")
			.eq("user_id", userId)
			.order("created_at", { ascending: false });

		if (error) throw error;
		return data || [];
	},

	async createBoards(board: Omit<Board, "id" | "created_at" | "updated_at">): Promise<Board> {
		const { data, error } = await supabase.from("boards").insert(board).select().single();

		if (error) throw error;
		return data || [];
	},
};

export const columnService = {
	// async getBoards(userId: string): Promise<Board[]> {
	// 	const { data, error } = await supabase
	// 		.from("boards")
	// 		.select("*")
	// 		.eq("user_id", userId)
	// 		.order("created_at", { ascending: false });

	// 	if (error) throw error;
	// 	return data || [];
	// },

	async createColumn(column: Omit<Column, "id" | "created_at">): Promise<Column> {
		const { data, error } = await supabase.from("columns").insert(column).select().single();

		if (error) throw error;
		return data || [];
	},
};

export const boardDataService = {
	async createBoardWithDefaultColumns(boardData: {
		title: string;
		description?: string;
		color?: string;
		user_id: string;
	}
	){
		const board = await boardService.createBoards({ title: boardData.title, descript ion: boardData.description, color: boardData.color || "bg-blue-500", user_id: user_id: boardData.userId });
	},
};
