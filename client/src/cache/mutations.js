import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			firstName
			lastName
			password
			initials
		}
	}
`;
export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;
export const UPDATE = gql`
mutation Update($email: String!, $newEmail: String!, $password: String!, $firstName: String!, $lastName: String!) {
	update(email: $email, newEmail: $newEmail, newPassword: $password, newFirstName: $firstName, newLastName: $lastName) {
		email
		password
		firstName
		lastName
	}
}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const ADD_ITEM = gql`
	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
		addItem(item: $item, _id: $_id, index: $index)
	}
`;

export const DELETE_ITEM = gql`
	mutation DeleteItem($itemId: String!, $_id: String!) {
		deleteItem(itemId: $itemId, _id: $_id) {
			_id
			id
			description
			due_date
			assigned_to
			completed
			landmark
			parRegId
			subRegId
		}
	}
`;

export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
			_id
			id
			description
			due_date
			assigned_to
			completed
			landmark
		}
	}
`;

export const UPDATE_LANDMARK_FIELD = gql`
mutation UpdateLandmarkField($_id: String!, $itemId: String!, $field: String!, $value: [String], $flag: Int!) {
	updateLandmarkField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
		_id
		id
		description
		due_date
		assigned_to
		completed
		landmark
	}
}
`;

export const REORDER_ITEMS = gql`
	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
			_id
			id
			description
			due_date
			assigned_to
			completed
			landmark
		}
	}
`;
export const SORT_ITEMS = gql`
	mutation SortItems($_id: String!, $colNum: Int!, $clickNum: Int!, $prevList: [String], $execute: Int!) {
		sortItems(_id: $_id, colNum: $colNum, clickNum: $clickNum, prevList: $prevList, execute: $execute) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;
export const SWAP_TOP = gql`
	mutation swapTop($swapId: Int) {
		swap_top(swapId: $swapId)
	}
`;
export const ADD_TODOLIST = gql`
	mutation AddTodolist($todolist: TodoInput!) {
		addTodolist(todolist: $todolist) 
	}
`;

export const DELETE_TODOLIST = gql`
	mutation DeleteTodolist($_id: String!) {
		deleteTodolist(_id: $_id)
	}
`;

export const UPDATE_TODOLIST_FIELD = gql`
	mutation UpdateTodolistField($_id: String!, $field: String!, $value: String!) {
		updateTodolistField(_id: $_id, field: $field, value: $value)
	}
`;
