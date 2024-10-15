import axios from 'axios';
import { useMatterStore } from '../store/MatterStore';

export async function useCreateMatter(createdMatter: string): Promise<void> {
  const matterStore = useMatterStore();

  matterStore.setLoading(true);

  try {
    const response = await axios.post('http://localhost:5002/api/createMatter',
      {
        clientId: 31992158,
        createdMatter,
        matterData: [{}],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const newMatterId = response.data._embedded[createdMatter]?.[0]?.id;
    const newMatter = { id: newMatterId, name: createdMatter };

    matterStore.addMatter(newMatter);
  } catch (e) {
    console.error('Error fetching data:', e);
  } finally {
    matterStore.setLoading(false);
  }
}
