function QuickActions({ onExpense, onIncome }) {
  return (
    <div className="action-row">
      <ClayButton tone="soft-red" icon={ArrowDownCircle} onClick={onExpense}>Registrar gasto</ClayButton>
      <ClayButton tone="soft-blue" icon={ArrowUpCircle} onClick={onIncome}>Registrar ingreso</ClayButton>
    </div>
  );
}

export default QuickActions;