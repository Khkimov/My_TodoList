import React from "react";
import "./App.css";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todoList";
import ItemStatusFilter from "../item-status-filter";
import { Component } from "react";
import AddItem from "../add-item";


export default class App extends Component {

	maxId = 100;

	state = {
		todoData: [
			this.createTodoItem('Learn React'),
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Learn Redux')
		],
		search: '',
		filter: 'all'
	};

	createTodoItem (label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		};
	};

	deleteItem = (id) => {
		this.setState(({todoData}) => {
			const idx = todoData.findIndex((el) => el.id === id);
			
			const newArray = [
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1)
			];

			return {
				todoData: newArray
			};
		});
	};

	addItem = (text) => {
		const newItem = this.createTodoItem(text);

		this.setState(({todoData}) => {
			const newArr = [
				...todoData,
				newItem
			];

			return {
				todoData: newArr
			};
		});
	};

	toggleProperty (arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id);

			const oldItem = arr[idx];
			const newItem = {...oldItem, [propName]: !oldItem[propName]}

			return [
				...arr.slice(0, idx),
				newItem,
				...arr.slice(idx + 1)
			];
	};

	onToggleDone = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		});
	};
	
	onToggleImportant = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		});
	};

	onSearchPanel = (search) => {
		this.setState({search})
	}

	onFilterChange = (filter) => {
		this.setState({filter})
	}

	searchPanel (items, search) {
		if (search.length === 0) {
			return items;
		}

		return items.filter((item) => {
			return item.label
			.toLowerCase()
			.indexOf(search.toLowerCase()) > -1
		});
	};

	filter (items, filter) {
		switch(filter) {
			case 'all':
				return items;
			case 'active':
				return items.filter((item) => !item.done);
			case 'done':
				return items.filter((item) => item.done);
			default:
				return items;
		}
	}

	render () {

		const { todoData, search, filter } = this.state;
	const visibleItems = this.filter(this.searchPanel(todoData, search), filter);

		const doneCount = todoData.filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount
		return (
			<div className="todo">
			<AppHeader toDo={todoCount}
			done={doneCount}/>
			<div className="search-filter">
			<SearchPanel
			onSearchPanel={this.onSearchPanel}
			/>
			<ItemStatusFilter
			filter={filter}
			onFilterChange={this.onFilterChange}
			/>
			</div>
			<TodoList 
			todos={visibleItems}
			onDeleted={this.deleteItem}
			onToggleImportant={this.onToggleImportant}
			onToggleDone={this.onToggleDone}
			/>
			<AddItem 
			addItem={this.addItem}
			/>
		</div>
		);
	};
};

