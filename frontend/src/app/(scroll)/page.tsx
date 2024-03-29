import CylinderScene from '@/components/plot/three/cylinder/CylinderScene';
import Table from '@/components/table';

const exampleTable = (
  <Table caption="A summary of the UK's most famous punk bands">
    <thead>
      <tr>
        <th scope='col'>Band</th>
        <th scope='col'>Year formed</th>
        <th scope='col'>No. of Albums</th>
        <th scope='col'>Most famous song</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope='row'>Buzzcocks</th>
        <td>1976</td>
        <td>9</td>
        <td>Ever fallen in love (with someone you shouldn't've)</td>
      </tr>
      <tr>
        <th scope='row'>The Clash</th>
        <td>1976</td>
        <td>6</td>
        <td>London Calling</td>
      </tr>

      <tr>
        <th scope='row'>The Stranglers</th>
        <td>1974</td>
        <td>17</td>
        <td>No More Heroes</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope='row' colSpan={2}>
          Total albums
        </th>
        <td>77</td>
        <td></td>
      </tr>
    </tfoot>
  </Table>
);

export default function Home() {
  return (
    <>
      <div className='h-96'>
        <CylinderScene />
      </div>

      <div className='2xl:max-w-2xl w-full flex flex-col gap-4'>
        <section>
          <h2>Abstract</h2>
          <p className='sm:columns-2 gap-4'>
            The red line moved across the page. With each millimeter it advanced
            forward, something changed in the room. The actual change taking
            place was difficult to perceive, but the change was real. The red
            line continued relentlessly across the page and the room would never
            be the same. One foot in front of the other, One more step, and then
            one more. Jack's only thoughts were to keep moving no matter how
            much his body screamed to stop and rest. He's lost almost all his
            energy and his entire body ached beyond belief, but he forced
            himself to take another step. Then another. And then one more. He
            picked up the burnt end of the branch and made a mark on the stone.
            Day 52 if the marks on the stone were accurate. He couldn't be sure.
            Day and nights had begun to blend together creating confusion, but
            he knew it was a long time. Much too long.
          </p>
        </section>

        <div className='grid grid-cols-2 gap-4'>
          <section>
            <h2>Body</h2>
            <p>
              They say you only come to peace with yourself when you know
              yourself better than those around you. Derick knew nothing about
              this. He thought he had found peace but this was an illusion as he
              was about to find out with an unexpected occurrence that he
              actually knew nothing about himself.
            </p>
            <h3>subsection</h3>
            <p>
              At that moment he had a thought that he'd never imagine he'd
              consider. "I could just cheat," he thought, "and that would solve
              the problem." He tried to move on from the thought but it was
              persistent. It didn't want to go away and, if he was honest with
              himself, he didn't want it to.
            </p>
          </section>

          <section>
            <h2>Personal info</h2>
            {exampleTable}
          </section>
        </div>

        <section>
          <h2>Abstract</h2>
          <p className='sm:columns-2  gap-4'>
            The red line moved across the page. With each millimeter it advanced
            forward, something changed in the room. The actual change taking
            place was difficult to perceive, but the change was real. The red
            line continued relentlessly across the page and the room would never
            be the same. One foot in front of the other, One more step, and then
            one more. Jack's only thoughts were to keep moving no matter how
            much his body screamed to stop and rest. He's lost almost all his
            energy and his entire body ached beyond belief, but he forced
            himself to take another step. Then another. And then one more. He
            picked up the burnt end of the branch and made a mark on the stone.
            Day 52 if the marks on the stone were accurate. He couldn't be sure.
            Day and nights had begun to blend together creating confusion, but
            he knew it was a long time. Much too long.
          </p>
        </section>

        <div className='grid grid-cols-2 gap-4'>
          <section>
            <h2>Body</h2>
            <p>
              They say you only come to peace with yourself when you know
              yourself better than those around you. Derick knew nothing about
              this. He thought he had found peace but this was an illusion as he
              was about to find out with an unexpected occurrence that he
              actually knew nothing about himself.
            </p>
            <h3>subsection</h3>
            <p>
              At that moment he had a thought that he'd never imagine he'd
              consider. "I could just cheat," he thought, "and that would solve
              the problem." He tried to move on from the thought but it was
              persistent. It didn't want to go away and, if he was honest with
              himself, he didn't want it to.
            </p>
          </section>

          <section>
            <h2>Personal info</h2>
            {exampleTable}
          </section>
        </div>

        <section>
          <h2>Abstract</h2>
          <p className='sm:columns-2  gap-4'>
            The red line moved across the page. With each millimeter it advanced
            forward, something changed in the room. The actual change taking
            place was difficult to perceive, but the change was real. The red
            line continued relentlessly across the page and the room would never
            be the same. One foot in front of the other, One more step, and then
            one more. Jack's only thoughts were to keep moving no matter how
            much his body screamed to stop and rest. He's lost almost all his
            energy and his entire body ached beyond belief, but he forced
            himself to take another step. Then another. And then one more. He
            picked up the burnt end of the branch and made a mark on the stone.
            Day 52 if the marks on the stone were accurate. He couldn't be sure.
            Day and nights had begun to blend together creating confusion, but
            he knew it was a long time. Much too long.
          </p>
        </section>

        <div className='grid grid-cols-2 gap-4'>
          <section>
            <h2>Body</h2>
            <p>
              They say you only come to peace with yourself when you know
              yourself better than those around you. Derick knew nothing about
              this. He thought he had found peace but this was an illusion as he
              was about to find out with an unexpected occurrence that he
              actually knew nothing about himself.
            </p>
            <h3>subsection</h3>
            <p>
              At that moment he had a thought that he'd never imagine he'd
              consider. "I could just cheat," he thought, "and that would solve
              the problem." He tried to move on from the thought but it was
              persistent. It didn't want to go away and, if he was honest with
              himself, he didn't want it to.
            </p>
          </section>

          <section>
            <h2>Personal info</h2>
            {exampleTable}
          </section>
        </div>
      </div>
    </>
  );
}
