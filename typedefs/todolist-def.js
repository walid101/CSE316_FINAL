const { gql } = require('apollo-server');
const typeDefs = gql `
	type Todolist {
		_id: String!
		id: Int!
		name: String!
		owner: String!
		items: [Item]
		level: Int!
		parentId: String!
		path: [String]
	}
	type Item {
		_id: String!
		id: Int!
		description: String!
		due_date: String!
		assigned_to: String!
		completed:  String!
		landmark: [String]
		parRegId: String!
		subRegId: String!
	}
	extend type Query {
		getAllTodos: [Todolist]
		getTodoById(_id: String!): Todolist 
	}
	extend type Mutation {
		addItem(item: ItemInput!, _id: String!, index: Int!): String
		addTodolist(todolist: TodoInput!): String
		deleteItem(itemId: String!, _id: String!): [Item]		
		deleteTodolist(_id: String!): Boolean
		updateTodolistField(_id: String!, field: String!, value: String!): String
		updateItemField(itemId: String!, _id: String!, field: String!, value: String!, flag: Int!): [Item]
		updateLandmarkField(itemId: String!, _id: String!, field: String!, value: [String], flag: Int!): [Item]
		reorderItems(itemId: String!, _id: String!, direction: Int!): [Item]
		sortItems(_id: String!, colNum: Int!, clickNum: Int!, prevList: [String], execute: Int!): [Item]
		swap_top(swapId: Int): [Int!]
	}
	input FieldInput {
		_id: String
		field: String
		value: String
	}
	input TodoInput {
		_id: String
		id: Int
		name: String
		owner: String
		items: [ItemInput]
		level: Int
		parentId: String
		path: [String]
	}
	input ItemInput {
		_id: String
		id: Int
		description: String
		due_date: String
		assigned_to: String
		completed: String
		landmark: [String]
		parRegId: String
		subRegId: String
	}
`;

module.exports = { typeDefs: typeDefs }