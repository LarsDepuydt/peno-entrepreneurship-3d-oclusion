import { deletePatient } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useQuery } from '@tanstack/react-query';

/**
 * This is a component to test the backend link using protobuf connect
 */

const Test = () => {
  const { data } = useQuery(deletePatient.useQuery({ id: '2' }));

  return (
    <>
      <p>Test</p>
      {data && <p>{data.name}</p>}
    </>
  );
};

export default Test;
