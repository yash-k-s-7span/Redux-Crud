
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Create Action
export const createUser = createAsyncThunk(
    "userDetail/createUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://6679622518a459f6394f87dc.mockapi.io/CRUD",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Read Action
export const showUser = createAsyncThunk("showUser", async (data, { rejectWithValue }) => {
    try {
        // Convert the data object to query parameters
        const queryParams = new URLSearchParams(data).toString();
        const response = await fetch(`https://6679622518a459f6394f87dc.mockapi.io/CRUD?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Delete Action
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://6679622518a459f6394f87dc.mockapi.io/CRUD/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

// Update Action
export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://6679622518a459f6394f87dc.mockapi.io/CRUD/${data.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
       
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

const userDetailSlice = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: [],
    },
    reducers: {
        searchUser : (state, action) => {
            state.searchData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Display
            .addCase(showUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.users = state.users.filter((element) => element.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload;
                const index = state.users.findIndex((user) => user.id === updatedUser.id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default userDetailSlice.reducer;
export const {searchUser} = userDetailSlice.actions;