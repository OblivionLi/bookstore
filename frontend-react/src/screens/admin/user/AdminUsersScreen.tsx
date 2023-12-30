import React, {useEffect, useState} from 'react';
import {Button, Divider, Paper, Skeleton, Tooltip, Typography} from "@mui/material";
import DataTable, {TableColumn} from "react-data-table-component";
import UsersService from "../../../services/UsersService";
import Box from "@mui/material/Box";
import IUserResponse from "../../../types/user/IUserResponse";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ExpandedUserDetails from "../../../components/user/ExpandedUserDetails";
import EditUserDialog from "./EditUserDialog";

const AdminUsersScreen = () => {
    const [users, setUsers] = useState<IUserResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUserResponse | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        UsersService.getAllUsers()
            .then((response: any) => {
                setUsers(response.data as IUserResponse[])
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const formatDate = (date: Date): string => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    };

    const DateCell = ({ row, selector }: { row: IUserResponse; selector: (row: IUserResponse) => Date }) => {
        return (
            <Tooltip title={formatDate(selector(row))} arrow>
                <Typography variant="body2" noWrap>{formatDate(selector(row))}</Typography>
            </Tooltip>
        );
    };

    const createTooltipColumn = (
        name: string,
        selector: (row: IUserResponse) => string
    ): TableColumn<IUserResponse> => {
        return {
            name,
            cell: (row: IUserResponse) => (
                <Tooltip title={selector(row)} arrow>
                    <Typography variant="body2" noWrap>
                        {selector(row)}
                    </Typography>
                </Tooltip>
            ),
            sortable: true,
        };
    };

    const columns: TableColumn<IUserResponse>[] = [
        {
            name: 'User ID',
            selector: row => row.id,
            sortable: true,
        },
        createTooltipColumn('First Name', (row) => row.firstName),
        createTooltipColumn('Last Name', (row) => row.lastName),
        createTooltipColumn('Email', (row) => row.email),
        {
            name: 'Roles',
            cell: (row: IUserResponse) => (
                <Tooltip title={row.userGroupCodes.join(', ')} arrow>
                    <Typography variant="body2" noWrap>{row.userGroupCodes.join(', ')}</Typography>
                </Tooltip>
            ),
            sortable: true,
        },
        {
            name: 'Is Locked?',
            selector: row => row.locked ? "true" : "false",
            sortable: true,
        },
        {
            name: 'Book Ratings Count',
            selector: row => row.bookRatings,
            sortable: true,
        },
        {
            name: 'Created At',
            cell: (row: IUserResponse) => <DateCell row={row} selector={(row) => new Date(row.createdAt)} />,
            sortable: true,
        },        {
            name: 'Updated At',
            cell: (row: IUserResponse) => <DateCell row={row} selector={(row) => new Date(row.updatedAt)} />,
            sortable: true,
        },
        {
            name: 'Options',
            cell: (row: IUserResponse) => (
                <Box sx={{ mt: 1, mb: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(row)}
                        size="small"
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelete(row)}
                        size="small"
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        color={row.locked ? 'secondary' : 'primary'}
                        onClick={() => handleToggleLock(row, !row.locked)}
                        size="small"
                        startIcon={row.locked ? <LockOpenIcon /> : <LockIcon />}
                    >
                        {row.locked ? 'Unlock' : 'Lock'}
                    </Button>
                </Box>
            ),
        }
    ];

    const handleEdit = (row: IUserResponse) => {
        setEditDialogOpen(true);
        setSelectedUser(row);
    }

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setSelectedUser(null);
        fetchUsers();
    }

    const handleToggleLock = (row: IUserResponse, newLockValue: boolean) => {
        UsersService.lockUser(row.id, newLockValue)
            .then((response: any) => {
                fetchUsers()
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleDelete = (row: IUserResponse) => {
        UsersService.deleteUser(row.id)
            .then((response: any) => {
                fetchUsers()
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    return (
        <>
            <Typography variant={"h4"} gutterBottom>
                Users
                <Typography variant="overline" display="block" gutterBottom>
                    For columns with cut value, hover over with your cursor to view the full value.
                </Typography>
            </Typography>
            <Divider />

            {loading ?
                (
                    <Box sx={{width: '100%'}}>
                        {/* Skeleton for table header */}
                        <Box display="flex" alignItems="center" p={1}>
                            {Array.from({length: columns.length}).map((_, index) => (
                                <Box key={index} flex={1} pr={2}>
                                    <Skeleton variant="text"/>
                                </Box>
                            ))}
                        </Box>

                        {/* Skeleton for table rows */}
                        {Array.from({length: 2}).map((_, rowIndex) => (
                            <Box key={rowIndex} display="flex" alignItems="center" p={1}>
                                {Array.from({length: columns.length}).map((_, colIndex) => (
                                    <Box key={colIndex} flex={1} pr={2}>
                                        <Skeleton variant="text"/>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                ) : (

            <Paper elevation={3}
                   sx={{padding: 3, marginTop: 3, marginLeft: 'auto', marginRight: 'auto'}}>

                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    expandableRows
                    expandableRowsComponent={ExpandedUserDetails}
                />
            </Paper>
            )}

            <EditUserDialog
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                rowData={selectedUser}
            />
        </>
    );
};

export default AdminUsersScreen;