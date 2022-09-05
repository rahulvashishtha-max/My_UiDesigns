var selectedRow = null

function onFormSubmit()
{
    var formData = readFormData();
    if(selectedRow == null)
    {
        insertNewRecord(formData);
    }
    else
    {
        updateRecord(formData);
    }
    resetForm();
}
function readFormData()
{
    var formData = {};
    formData['PatientName'] = document.getElementById('PatientName').value;
    formData['Problem'] = document.getElementById('Problem').value;
    formData['id'] = document.getElementById('id').value;
    return formData;
}
function insertNewRecord(data)
{
    var table = document.getElementById('Patient-list').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.PatientName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.Problem;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.id;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)" class="btn btn-success btn-sm edit"><i class="far fa-edit" style="pointer-events: none;"></i></a>`;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick="onDelete(this)" class="btn btn-danger btn-sm delete"><i class="far fa-trash-alt" style="pointer-events: none;"></i></a>`;
}
function resetForm()
{
    document.getElementById('PatientName').value = '';
    document.getElementById('Problem').value = '';
    document.getElementById('id').value = '';
    selectedRow = null;
}
function onEdit(td)
{
    selectedRow = td.parentElement.parentElement;
    document.getElementById('PatientName').value = selectedRow.cells[0].innerHTML;
    document.getElementById('Problem').value = selectedRow.cells[1].innerHTML;
    document.getElementById('id').value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData)
{
    selectedRow.cells[0].innerHTML = formData.fruitName;
    selectedRow.cells[1].innerHTML = formData.quantity;
    selectedRow.cells[2].innerHTML = formData.id;
}
function onDelete(td)
{
    row = td.parentElement.parentElement;
    document.getElementById('Patient-list').deleteRow(row.rowIndex);
    resetForm();
}
