# This script fetches a single md file to use as documenation from another repository.
# Author: Cristian Jara-Figueroa, Phd Student MIT Media Lab
# Last updated: September 21, 2020
# 
# The script takes in four positional arguments, the last two being optional
# Run as: update.sh REPO_NAME_OWNER REPO_NAME (DESTINATION_PATH) (SOURCE_FILE_PATH)
#   * REPO_NAME_OWNER: Organization or user where the repo lives (e.g. CityScope)
#   * REPO_NAME: Name of repo (e.g. CS_Brix)
#   * DESTINATION_PATH: Path in local repo where to store the md file (it defaults to docsite/docs/modules)
#   * SOURCE_FILE_PATH: Path to fetch from remote repo, including name of file (it defaults to master/README.md). This can also be a list of files, which will be joined into a single file.

REPO_NAME_OWNER=${1}
REPO_NAME=${2}
REPO_LABEL=${REPO_NAME#"CS_"}
DESTINATION_PATH=${3:-docsite/docs/modules}/${REPO_LABEL}
shift
shift 
shift
if [[ $# -le 1 ]]; then
if [[ "${REPO_NAME_OWNER#"wiki/"}" != "$REPO_NAME_OWNER" ]]; then
SOURCE_FILE_PATH=${1:-Home.md}
else
SOURCE_FILE_PATH=${1:-master/README.md}
fi
else
SOURCE_FILE_PATH="$@"
fi

for SFP in $SOURCE_FILE_PATH
do
echo "Copying docs from: ${REPO_NAME}/${SFP}"
done
echo "Copying docs into: ${DESTINATION_PATH}/${REPO_LABEL}.md"
mkdir -p ${DESTINATION_PATH}/
for SFP in $SOURCE_FILE_PATH
do
echo "Downloading file at https://raw.githubusercontent.com/${REPO_NAME_OWNER}/${REPO_NAME}/${SFP}"
curl -o ${DESTINATION_PATH}/${SFP}_raw.md https://raw.githubusercontent.com/${REPO_NAME_OWNER}/${REPO_NAME}/${SFP}
done
touch ${DESTINATION_PATH}/${REPO_LABEL}_id.md
echo "---" >> ${DESTINATION_PATH}/${REPO_LABEL}_id.md
echo "id: ${REPO_LABEL}" >> ${DESTINATION_PATH}/${REPO_LABEL}_id.md
echo "---" >> ${DESTINATION_PATH}/${REPO_LABEL}_id.md
touch ${DESTINATION_PATH}/${REPO_LABEL}.md
cat ${DESTINATION_PATH}/${REPO_LABEL}_id.md >> ${DESTINATION_PATH}/${REPO_LABEL}.md
rm ${DESTINATION_PATH}/${REPO_LABEL}_id.md
for SFP in $SOURCE_FILE_PATH
do
cat ${DESTINATION_PATH}/${SFP}_raw.md >> ${DESTINATION_PATH}/${REPO_LABEL}.md
echo "" >> ${DESTINATION_PATH}/${REPO_LABEL}.md
rm ${DESTINATION_PATH}/${SFP}_raw.md
done
