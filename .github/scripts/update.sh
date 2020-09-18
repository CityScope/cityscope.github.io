# This script fetches a single md file to use as documenation from another repository.
# Author: Cristian Jara-Figueroa, Phd Student MIT Media Lab
# Last updated: September 18, 2020
# 
# The script takes in four positional arguments, the last two being optional
# Run as: update.sh REPO_NAME_OWNER REPO_NAME (DESTINATION_PATH) (SOURCE_FILE_PATH)
#   * REPO_NAME_OWNER: Organization or user where the repo lives (e.g. CityScope)
#   * REPO_NAME: Name of repo (e.g. CS_Brix)
#   * DESTINATION_PATH: Path in local repo where to store the md file (it defaults to docsite/docs/general)
#   * SOURCE_FILE_PATH: Path to fetch, including name of file, from remote repo (it defaults to master/README.md)

echo "Copying docs from: ${2}/${4:-master/README.md}"
echo "Copying docs into: ${3:-docsite/docs/general}/${2}.md"
echo "Downloading file at https://raw.githubusercontent.com/${1}/${2}/${4:-master/README.md}"
mkdir -p ${3:-docsite/docs/general}/
curl -o ${3:-docsite/docs/general}/${2}_raw.md https://raw.githubusercontent.com/${1}/${2}/${4:-master/README.md}
head ${3:-docsite/docs/general}/${2}_raw.md
touch ${3:-docsite/docs/general}/${2}_id.md
echo "---" >> ${3:-docsite/docs/general}/${2}_id.md
echo "id: ${2}" >> ${3:-docsite/docs/general}/${2}_id.md
echo "---" >> ${3:-docsite/docs/general}/${2}_id.md
head ${3:-docsite/docs/general}/${2}_id.md
cat ${3:-docsite/docs/general}/${2}_id.md ${3:-docsite/docs/general}/${2}_raw.md > ${3:-docsite/docs}/${2}.md
head ${3:-docsite/docs}/${2}.md
ls -la ${3:-docsite/docs/general}/
rm ${3:-docsite/docs/general}/${2}_id.md
rm ${3:-docsite/docs/general}/${2}_raw.md
