import ClassInviteTable from '../../components/ClassInviteTable';
import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import Link from 'next/link';
import Layout from '../../components/layout';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  // Here is where (if our env file is missing in our web folder) our code fails.
  // There is no way to reach our DB link since we cannot access our env file that states where it is.
  const classrooms = await prisma.Classroom.findMany();
  const output = [];
  for (let i = 0; i < classrooms.length; i++) {
    output[i] = {
      classroomName: classrooms[i].classroomName,
      classroomId: classrooms[i].classroomId,
      description: classrooms[i].description,
      createdAt: JSON.stringify(classrooms[i].createdAt)
    };
  }
  return {
    props: { classrooms: output }
  };
}

export default function Invite({ classrooms }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
          <Navbar>
            <li>
              <div className='border-solid border-2 pl-4 pr-4'>
                <Link href={'/invite'}>Invite</Link>
              </div>
            </li>
            <li>
              <div className='border-solid border-2 pl-4 pr-4'>
                <Link href={'#'}> Menu</Link>
              </div>
            </li>
            <li>
              <div className='hover:bg-[#ffbf00] shadedow-lg border-solid border-color: inherit; border-2 pl-4 pr-4 bg-[#f1be32] text-black'>
                <Link href={'#'}>Sign out</Link>
              </div>
            </li>
          </Navbar>
        </Head>

        <div className={'text-center p-10'}>
          <h1> Copy invite code by clicking on your preferred class. </h1>
        </div>

        {classrooms.map(classrooms => (
          <div key={classrooms.id}>
            <a>
              <ClassInviteTable classes={classrooms}></ClassInviteTable>
            </a>
          </div>
        ))}
      </Layout>
    </>
  );
}