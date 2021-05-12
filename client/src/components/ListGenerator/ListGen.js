import {useState, useEffect } 	        from 'react';
import { GET_DB_TODOS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
/*	const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);
	const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);*/
export default class ListGen {
    static runGenId                 = 250;
    static generator = null;
    static getInstance() {
        if (ListGen.generator == null) {
            ListGen.generator = new ListGen();
        }
        return this.generator;
    }

    createNewList = async (prevLevelId, AddTodoList) => {
        const id = this.runGenId;
        this.runGenId+=1;
        let list = {
            _id: '',
            id: id,
            name: 'Untitled',
            //owner: props.user._id,
            items: [],
            level: prevLevelId
        }
        const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
        return id;
    }
}