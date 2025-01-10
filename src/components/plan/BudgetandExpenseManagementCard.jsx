import React from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  Grid,
  TextField,
  Button
} from '@mui/material';
import {
  EventNote,
  NoteAddTwoTone,
  Category,
  AttachMoney,
  MoneyOff,
  Description,
  Save
} from '@mui/icons-material';


function BudgetandExpenseManagementCard({formData ,setFormData}) {
  const [budgetDetails, setBudgetDetails] = React.useState({
    budgetId: '',
    expenseCategory: '',
    allocatedBudget: 0,
    actualExpense: 0,
    notes: ''
  });

  const handleChange = (field) => (event) => {
    setBudgetDetails(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };
  const Add = () => {
    setFormData({
      
      ...formData,
      BudgetandExpenseManagement:[...formData.BudgetandExpenseManagement,budgetDetails]
    });
    setBudgetDetails(
      {
        budgetId: '',
    expenseCategory: '',
    allocatedBudget: 0,
    actualExpense: 0,
    notes: ''
      }
    )
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log('Budget Details:', budgetDetails);
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

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="budget-id"
                label="Budget ID"
                variant="outlined"
                required
                value={budgetDetails.budgetId}
                onChange={handleChange('budgetId')}
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
                required
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
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save />}
                sx={{ mt: 2 }}
                onClick={Add}
              >
                Save Budget Details
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default BudgetandExpenseManagementCard;
