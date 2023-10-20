import '../styles/accidentTable.css';

function AccidentTable() {
  return (
    <table>
      <caption>*사고다발구간</caption>
      <tr>
        <th scope="col">위험도</th>
        <th scope="col">색상</th>
      </tr>
      <tr>
        <td>1</td>
        <td id="td1"> </td>
      </tr>
      <tr>
        <td>2</td>
        <td id="td2"> </td>
      </tr>
      <tr>
        <td>3</td>
        <td id="td3"> </td>
      </tr>
    </table>
  );
}
export default AccidentTable;
