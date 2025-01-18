import React from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  EventNote,
  NoteAddTwoTone,
  Category,
  AttachMoney,
  MoneyOff,
  Description,
  Save,
  Edit,
  Delete
} from '@mui/icons-material';
import shortid from 'shortid';

function BudgetandExpenseManagementCard({ formData, setFormData }) {
  const [budgetDetails, setBudgetDetails] = React.useState({
    budgetId: shortid.generate(), 
    expenseCategory: 'all',
    allocatedBudget: 0,
    actualExpense: 0,
    notes: ''
  });

  const handleChange = (field) => (event) => {
    setBudgetDetails((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleAdd = () => {
    console.log(formData);
    setFormData({
      ...formData,
      BudgetandExpenseManagement: [
        ...formData?.BudgetandExpenseManagement,
        budgetDetails
      ]
    });
    resetForm();
  };

  const resetForm = () => {
    setBudgetDetails({
      budgetId: shortid.generate(),
      expenseCategory: 'all',
      allocatedBudget: 0,
      actualExpense: 0,
      notes: ''
    });
  };

  const handleDelete = (id) => {
    setFormData({
      ...formData,
      BudgetandExpenseManagement: formData.BudgetandExpenseManagement.filter(
        (item) => item.budgetId !== id
      )
    });
  };

  const handleEdit = (id) => {
    const selectedBudget = formData.BudgetandExpenseManagement.find(
      (item) => item.budgetId === id
    );
    setBudgetDetails(selectedBudget);
  };

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <EventNote fontSize="large" color="primary" />
          <Typography variant="h4" className="font-semibold">
            Budget and Expense Management
          </Typography>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="budget-id"
                label="Budget ID"
                variant="outlined"
                required
                value={budgetDetails.budgetId}
                 
                InputProps={{
                  startAdornment: <NoteAddTwoTone sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="expense-category"
                label="Expense Category"
                variant="outlined"
                required
                value={budgetDetails.expenseCategory}
                onChange={handleChange('expenseCategory')}
                InputProps={{
                  startAdornment: <Category sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                id="allocated-budget"
                label="Allocated Budget"
                variant="outlined"
                required
                value={budgetDetails.allocatedBudget}
                onChange={handleChange('allocatedBudget')}
                InputProps={{
                  startAdornment: <AttachMoney sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                id="actual-expense"
                label="Actual Expense"
                variant="outlined"
                 
                value={budgetDetails.actualExpense}
                onChange={handleChange('actualExpense')}
                InputProps={{
                  startAdornment: <MoneyOff sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                id="expense-notes"
                label="Expense Notes"
                variant="outlined"
                value={budgetDetails.notes}
                onChange={handleChange('notes')}
                InputProps={{
                  startAdornment: <Description sx={{ mr: 1, alignSelf: 'flex-start', mt: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Save />}
                sx={{ mt: 2 }}
                onClick={handleAdd}
              >
                Save Budget Details
              </Button>
            </Grid>
          </Grid>
        </form>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Budget ID</TableCell>
                <TableCell>Expense Category</TableCell>
                <TableCell>Allocated Budget</TableCell>
                <TableCell>Actual Expense</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData?.BudgetandExpenseManagement?.map((budget) => (
                <TableRow key={budget.budgetId}>
                  <TableCell>{budget.budgetId}</TableCell>
                  <TableCell>{budget.expenseCategory}</TableCell>
                  <TableCell>{budget.allocatedBudget}</TableCell>
                  <TableCell>{budget.actualExpense}</TableCell>
                  <TableCell>{budget.notes}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(budget.budgetId)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(budget.budgetId)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default BudgetandExpenseManagementCard;
